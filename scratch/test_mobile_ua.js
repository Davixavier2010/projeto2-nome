const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testMobileUA() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9288;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_ua_${Date.now()}`;
  const proc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-first-run',
    'about:blank'
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
  await send('Network.enable');

  await send('Network.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  });

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000/#portfolio' });
  await new Promise(r => setTimeout(r, 1200));

  const vp = await send('Runtime.evaluate', {
    expression: '({ innerW: window.innerWidth, innerH: window.innerHeight, outerW: window.outerWidth, outerH: window.outerHeight, dpr: window.devicePixelRatio })',
    returnByValue: true
  });
  console.log('Mobile UA Viewport metrics:', vp.result.value);

  // Open modal
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("btnOpenMathiasGallery").click();'
  });
  await new Promise(r => setTimeout(r, 600));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/mobile_ua_full.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved scratch/mobile_ua_full.png');

  ws.close();
  proc.kill();
}
testMobileUA().catch(console.error);

