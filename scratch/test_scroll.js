const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function testScroll() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9898;
  const userDir = path.join(os.tmpdir(), `ch_sc_fix_${Date.now()}`);

  const targetUrl = 'http://localhost:3000/#portfolio';
  const proc = spawn(chromePath, [
    targetUrl,
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1280,900',
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
      if (tabs && tabs.some(t => t.type === 'page' && t.webSocketDebuggerUrl)) break;
    } catch (e) {}
  }

  const pageTab = tabs.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
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

  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      document.getElementById('portfolio').scrollIntoView(true);
    `
  });
  await new Promise(r => setTimeout(r, 500));

  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

  // Desktop view: Orbs & title
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'portfolio-desktop-orbs-fixed.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved portfolio-desktop-orbs-fixed.png');

  // Desktop view: The 2 cards
  await send('Runtime.evaluate', {
    expression: `
      document.querySelector('.portfolio-grid').scrollIntoView(true);
      window.scrollBy(0, -90);
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'portfolio-desktop-2cards-fixed.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved portfolio-desktop-2cards-fixed.png');

  // Mobile View
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  // Mobile: Orbs
  await send('Runtime.evaluate', {
    expression: `
      document.querySelector('.orbs-showcase').scrollIntoView(true);
      window.scrollBy(0, -100);
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-portfolio-orbs-fixed.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-portfolio-orbs-fixed.png');

  // Mobile: Card 1 (Glacy Bistro - Plano Essencial)
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('modelo-essencial').scrollIntoView(true);
      window.scrollBy(0, -75);
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card1-glacy-fixed.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-card1-glacy-fixed.png');

  // Mobile: Card 2 (Doceria Doralice - Plano Personalizado)
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('modelo-personalizado').scrollIntoView(true);
      window.scrollBy(0, -75);
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card2-doceria-fixed.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-card2-doceria-fixed.png');

  ws.close();
  proc.kill();
  console.log('Done!');
}

testScroll().catch(console.error);

