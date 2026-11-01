const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function verifyScreenshots() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9895;
  const userDir = path.join(os.tmpdir(), `ch_sc_${Date.now()}`);

  const targetUrl = 'http://localhost:3000';
  console.log(`Starting Chrome on port ${port}...`);

  const proc = spawn(chromePath, [
    targetUrl,
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--disable-extensions',
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
      if (tabs && tabs.some(t => t.type === 'page' && t.webSocketDebuggerUrl)) break;
    } catch (e) {}
  }

  const pageTab = tabs.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
  if (!pageTab) {
    proc.kill();
    throw new Error('Chrome did not open target page');
  }

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

  await new Promise(r => setTimeout(r, 1500));

  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

  // 1. Desktop - View of the 2 cards
  await send('Runtime.evaluate', {
    expression: `
      const grid = document.querySelector('.portfolio-grid');
      const top = grid.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'desktop-portfolio-cards.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved desktop-portfolio-cards.png');

  // Desktop - View of Orbs + Banner
  await send('Runtime.evaluate', {
    expression: `
      const port = document.getElementById('portfolio');
      const top = port.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'desktop-portfolio-orbs.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved desktop-portfolio-orbs.png');

  // 2. Mobile View (390 x 844, scale 2)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  // Mobile: Orbs Showcase
  await send('Runtime.evaluate', {
    expression: `
      const orbs = document.querySelector('.orbs-showcase');
      const top = orbs.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-portfolio-orbs.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-portfolio-orbs.png');

  // Mobile: Card 1 (Glacy - Plano Essencial)
  await send('Runtime.evaluate', {
    expression: `
      const c1 = document.getElementById('modelo-essencial');
      const top = c1.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card-essencial.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-card-essencial.png');

  // Mobile: Card 1 info/price
  await send('Runtime.evaluate', {
    expression: `
      const c1 = document.getElementById('modelo-essencial');
      const top = c1.getBoundingClientRect().top + window.pageYOffset + 240;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card-essencial-details.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-card-essencial-details.png');

  // Mobile: Card 2 (Doceria - Plano Personalizado)
  await send('Runtime.evaluate', {
    expression: `
      const c2 = document.getElementById('modelo-personalizado');
      const top = c2.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card-personalizado.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-card-personalizado.png');

  // Mobile: Card 2 info/price
  await send('Runtime.evaluate', {
    expression: `
      const c2 = document.getElementById('modelo-personalizado');
      const top = c2.getBoundingClientRect().top + window.pageYOffset + 240;
      window.scrollTo({ top: top, behavior: 'instant' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card-personalizado-details.png'), Buffer.from(shot.data, 'base64'));
  console.log('✓ Saved mobile-card-personalizado-details.png');

  ws.close();
  proc.kill();
  console.log('✓ All captures finished!');
}

verifyScreenshots().catch(console.error);
