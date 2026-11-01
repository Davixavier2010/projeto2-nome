const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function verifyMobile() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9935;
  const userDir = path.join(os.tmpdir(), 'ch_verify_mathias_mob_' + Date.now());

  const proc = spawn(chromePath, [
    'http://localhost:3000/#portfolio',
    '--remote-debugging-port=' + port,
    '--headless=new',
    '--user-data-dir=' + userDir,
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=390,844',
    '--no-first-run'
  ]);

  let tabs = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      tabs = await new Promise((res, rej) => {
        http.get('http://localhost:' + port + '/json/list', r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => res(JSON.parse(d)));
        }).on('error', rej);
      });
      if (tabs && tabs.some(t => t.type === 'page')) break;
    } catch(e){}
  }

  const tab = tabs.find(t => t.type === 'page');
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const myId = id++;
      pending.set(myId, { resolve, reject });
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  }
  ws.onmessage = e => {
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
  await new Promise(r => setTimeout(r, 2000));

  // Open gallery
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('btnOpenMathiasGallery').click();
    `
  });
  await new Promise(r => setTimeout(r, 2000));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/mathias-gallery-mobile.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved mathias-gallery-mobile.png');

  ws.close();
  proc.kill();
  process.exit(0);
}

verifyMobile().catch(console.error);

