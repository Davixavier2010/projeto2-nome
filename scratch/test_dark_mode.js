const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testDarkMode() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9280;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_dark_${Date.now()}`;
  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

  const proc = spawn(chromePath, [
    'http://localhost:3000/',
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
  await send('DOM.enable');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await new Promise(r => setTimeout(r, 500));

  // Toggle Dark Mode
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("themeToggleBtn").click()'
  });
  await new Promise(r => setTimeout(r, 300));

  // 1. Dark Mode Hero
  let shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'mobile-dark-hero.png'), Buffer.from(shot.data, 'base64'));

  // 2. Dark Mode Portfolio & Spheres
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("portfolio").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 300));
  shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'mobile-dark-portfolio.png'), Buffer.from(shot.data, 'base64'));

  // 3. Dark Mode Extra Hub
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("mais-informacoes").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 300));
  shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'mobile-dark-extra-hub.png'), Buffer.from(shot.data, 'base64'));

  ws.close();
  proc.kill();
  console.log('Dark mode screenshots captured successfully!');
}

testDarkMode().catch(e => {
  console.error(e);
  process.exit(1);
});

