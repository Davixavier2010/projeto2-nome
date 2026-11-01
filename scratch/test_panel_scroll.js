const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testPanelScroll() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9265;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_panel_${Date.now()}`;
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

  // Click on the panel
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".btn-extra-tab[data-target=\'panel-promessa\']").click()'
  });
  await new Promise(r => setTimeout(r, 400));

  // Scroll to panel-promessa
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("panel-promessa").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 300));

  const evalRes = await send('Runtime.evaluate', {
    expression: '({ scrollY: window.scrollY, innerH: window.innerHeight, innerW: window.innerWidth })',
    returnByValue: true
  });
  const { scrollY, innerH, innerW } = evalRes.result.value;
  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: scrollY, width: innerW, height: innerH, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-panel-promessa-open.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved mobile-panel-promessa-open.png');

  ws.close();
  proc.kill();
}

testPanelScroll().catch(e => {
  console.error(e);
  process.exit(1);
});

