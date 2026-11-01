const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testClip() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9366;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_chk_${Date.now()}`;
  const proc = spawn(chromePath, [
    'http://localhost:3000/#portfolio',
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--window-size=390,844',
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
      if (tabs && tabs[0]?.webSocketDebuggerUrl) break;
    } catch (e) {}
  }
  const tab = tabs.find(t => t.url.includes('localhost')) || tabs[0];
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
  await new Promise(r => setTimeout(r, 600));

  await send('Runtime.evaluate', {
    expression: 'document.getElementById("btnOpenMathiasGallery").click();'
  });
  await new Promise(r => setTimeout(r, 600));

  // 1. Without clip
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/no_clip.png', Buffer.from(shot1.data, 'base64'));

  // 2. With clip x:0, y:0, w:390, h:844
  const shot2 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
  });
  fs.writeFileSync('scratch/with_clip_0_0.png', Buffer.from(shot2.data, 'base64'));

  ws.close();
  proc.kill();
}
testClip().catch(console.error);

