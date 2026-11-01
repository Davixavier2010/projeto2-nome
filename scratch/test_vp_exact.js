const { spawn } = require('child_process');
const http = require('http');

async function testVpExact() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9301;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_vpe_${Date.now()}`;
  const proc = spawn(chromePath, [
    'http://localhost:3000/#portfolio',
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
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

  // Let's get windowId
  const { windowId } = await send('Browser.getWindowForTarget');
  await send('Browser.setWindowBounds', {
    windowId,
    bounds: { width: 390, height: 844 }
  });

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));

  const vp = await send('Runtime.evaluate', {
    expression: '({ innerW: window.innerWidth, innerH: window.innerHeight, outerW: window.outerWidth, outerH: window.outerHeight, dpr: window.devicePixelRatio })',
    returnByValue: true
  });
  console.log('Viewport metrics with Browser.setWindowBounds:', vp.result.value);

  ws.close();
  proc.kill();
}
testVpExact().catch(console.error);

