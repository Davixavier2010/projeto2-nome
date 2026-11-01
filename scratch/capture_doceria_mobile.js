const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function captureDoceriaMobile() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9880;
  const userDir = path.join(os.tmpdir(), `ch_doceria_mob_${Date.now()}`);

  const targetUrl = 'https://doceriarida.vercel.app/';
  console.log(`Starting Chrome on port ${port} for ${targetUrl}...`);

  const proc = spawn(chromePath, [
    targetUrl,
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=414,896',
    '--no-first-run'
  ]);

  let tabs = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      tabs = await new Promise((res, rej) => {
        http.get(`http://localhost:${port}/json/list`, r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => res(JSON.parse(d)));
        }).on('error', rej);
      });
      if (tabs && tabs.some(t => t.type === 'page' && t.webSocketDebuggerUrl)) break;
    } catch (e) {}
  }

  const pageTab = tabs.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
  if (!pageTab) {
    proc.kill();
    throw new Error('Chrome did not open target page');
  }

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const myId = id++;
      pending.set(myId, { resolve, reject });
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  }
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  // Wait 3.5s for fonts & images to render
  await new Promise(r => setTimeout(r, 3500));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const outPath = path.resolve(__dirname, '../assets/images/mockup-doceria.png');
  fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
  console.log(`✓ Saved mockup-doceria.png (${fs.statSync(outPath).size} bytes)`);

  ws.close();
  proc.kill();
}

captureDoceriaMobile().catch(console.error);

