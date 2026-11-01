const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function inspectAngelo() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9346;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_angelo_${Date.now()}`;

  const proc = spawn(chromePath, [
    'http://localhost:3000/scratch/test_angelo_style.html',
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--window-size=1400,900',
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

  const tab = tabs.find(t => t.url.includes('angelo')) || tabs[0];
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
  await new Promise(r => setTimeout(r, 4000));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/test-angelo-style.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved angelo-so-desktop.png!');

  // Also extract styles and key text
  const domInfo = await send('Runtime.evaluate', {
    expression: `
      JSON.stringify({
        title: document.title,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        fontFamily: window.getComputedStyle(document.body).fontFamily,
        headings: [...document.querySelectorAll('h1, h2, h3')].map(h => h.textContent.trim()),
        links: [...document.querySelectorAll('a')].map(a => a.textContent.trim())
      })
    `,
    returnByValue: true
  });
  console.log('DOM info:', domInfo.result.value);

  ws.close();
  proc.kill();
  process.exit(0);
}

inspectAngelo().catch(console.error);
