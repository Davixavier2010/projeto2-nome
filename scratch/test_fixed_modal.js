const { spawn } = require('child_process');
const http = require('http');

async function testFixed() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9277;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_fix_${Date.now()}`;
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
  const tab = tabs[0];
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

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      try {
        const btn = document.getElementById('btnOpenMathiasGallery');
        if (!btn) return { error: 'no btn' };
        btn.click();
        const modal = document.getElementById('mathiasGalleryModal');
        const header = document.querySelector('.mathias-header');
        const bottom = document.querySelector('.mathias-bottom-bar');
        const rectM = modal.getBoundingClientRect();
        const rectH = header.getBoundingClientRect();
        const rectB = bottom.getBoundingClientRect();
        return {
          scrollY: window.scrollY,
          modal: { top: rectM.top, bottom: rectM.bottom, height: rectM.height },
          header: { top: rectH.top, bottom: rectH.bottom, height: rectH.height },
          bottom: { top: rectB.top, bottom: rectB.bottom, height: rectB.height }
        };
      } catch (err) {
        return { error: err.message, stack: err.stack };
      }
    })()`,
    returnByValue: true
  });
  console.log('Result:', JSON.stringify(res.result.value, null, 2));

  ws.close();
  proc.kill();
}
testFixed().catch(console.error);
