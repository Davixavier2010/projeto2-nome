const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testMobileClean() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9333;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_clean_${Date.now()}`;
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

  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
    `
  });

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));

  // Open modal
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('btnOpenMathiasGallery').click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  // Now check scrollY and take screenshot
  const info = await send('Runtime.evaluate', {
    expression: `({ scrollY: window.scrollY, innerH: window.innerHeight, innerW: window.innerWidth })`,
    returnByValue: true
  });
  console.log('Modal opened state:', info.result.value);

  // Capture screenshot of viewport
  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false
  });
  fs.writeFileSync('scratch/clean_modal_shot.png', Buffer.from(shot.data, 'base64'));

  ws.close();
  proc.kill();
}
testMobileClean().catch(console.error);

