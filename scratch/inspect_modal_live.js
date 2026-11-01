const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function inspectModalLive() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9355;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_insp_${Date.now()}`;
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
  await new Promise(r => setTimeout(r, 1000));

  // Check state before open
  const before = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        scrollY: window.scrollY,
        portfolioTop: document.getElementById('portfolio')?.getBoundingClientRect().top
      };
    })()`,
    returnByValue: true
  });
  console.log('Before open:', before.result.value);

  // Click open
  await send('Runtime.evaluate', {
    expression: `document.getElementById('btnOpenMathiasGallery').click();`
  });
  // Wait 1.5 seconds for any transition/scroll
  await new Promise(r => setTimeout(r, 1500));

  const after = await send('Runtime.evaluate', {
    expression: `(() => {
      const getBox = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, left: b.left, right: b.right, width: b.width, height: b.height };
      };
      const modal = document.getElementById('mathiasGalleryModal');
      const header = document.querySelector('.mathias-header');
      const title = document.querySelector('.mathias-brand-title');
      const pills = document.querySelector('.mathias-filter-pills');
      const stage = document.querySelector('.stage-3d-wrapper');
      const cylinder = document.querySelector('.carousel-cylinder');
      const bottom = document.querySelector('.mathias-bottom-bar');
      const card = document.querySelector('.project-card-3d.is-active');

      return {
        scrollY: window.scrollY,
        viewportH: window.innerHeight,
        viewportW: window.innerWidth,
        modal: getBox(modal),
        header: getBox(header),
        title: getBox(title),
        pills: getBox(pills),
        stage: getBox(stage),
        cylinder: getBox(cylinder),
        bottom: getBox(bottom),
        card: getBox(card)
      };
    })()`,
    returnByValue: true
  });
  console.log('After open:', JSON.stringify(after.result.value, null, 2));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/live_modal_shot.png', Buffer.from(shot.data, 'base64'));

  ws.close();
  proc.kill();
}
inspectModalLive().catch(console.error);

