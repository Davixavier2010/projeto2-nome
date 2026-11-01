const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testExactCapture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9388;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_exact_${Date.now()}`;
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
  await new Promise(r => setTimeout(r, 800));

  // 1. Scroll to portfolio
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      const p = document.getElementById('portfolio');
      if (p) p.scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 400));

  // 2. Open modal
  await send('Runtime.evaluate', {
    expression: `document.getElementById('btnOpenMathiasGallery').click();`
  });
  await new Promise(r => setTimeout(r, 500));

  const status = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('.mathias-header');
      const stage = document.querySelector('.stage-3d-wrapper');
      const cylinder = document.querySelector('.carousel-cylinder');
      const bottom = document.querySelector('.mathias-bottom-bar');
      const card = document.querySelector('.project-card-3d.is-active');
      return {
        scrollY: window.scrollY,
        headerRect: header ? header.getBoundingClientRect() : null,
        stageRect: stage ? stage.getBoundingClientRect() : null,
        cylinderRect: cylinder ? cylinder.getBoundingClientRect() : null,
        bottomRect: bottom ? bottom.getBoundingClientRect() : null,
        activeCardRect: card ? card.getBoundingClientRect() : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Status before shot:', JSON.stringify(status.result.value, null, 2));

  // Full screenshot
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/exact_test.png', Buffer.from(shot.data, 'base64'));

  ws.close();
  proc.kill();
}
testExactCapture().catch(console.error);

