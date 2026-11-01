const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const url = process.argv[2] || 'http://localhost:3000/#portfolio';
const outputPath = process.argv[3] || 'C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/portfolio-preview.png';
const selector = process.argv[4] || null;

async function takeScreenshot() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9350 + Math.floor(Math.random() * 50);
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_shot_${Date.now()}`;

  const proc = spawn(chromePath, [
    url,
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--window-size=1400,1050',
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

  if (!tabs || !tabs[0]?.webSocketDebuggerUrl) {
    throw new Error('Could not connect to Chrome');
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
  await new Promise(r => setTimeout(r, 2500));

  if (selector) {
    await send('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('${selector}');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outputPath, Buffer.from(shot.data, 'base64'));
  console.log(`Saved screenshot to ${outputPath}!`);

  ws.close();
  proc.kill();
  process.exit(0);
}

takeScreenshot().catch(err => {
  console.error(err);
  process.exit(1);
});

