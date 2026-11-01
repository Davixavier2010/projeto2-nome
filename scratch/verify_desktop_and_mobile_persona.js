const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function verifyAll() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

  // ==========================================
  // PART 1: DESKTOP VERIFICATION (1280x800)
  // ==========================================
  console.log('--- TESTING DESKTOP (COMPUTER) ---');
  const portDesk = 9310;
  const userDirDesk = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_desk_${Date.now()}`;
  const procDesk = spawn(chromePath, [
    'http://localhost:3000/',
    `--remote-debugging-port=${portDesk}`,
    '--headless=new',
    `--user-data-dir=${userDirDesk}`,
    '--disable-gpu',
    '--window-size=1280,800',
    '--no-first-run'
  ]);

  let tabsDesk = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      tabsDesk = await new Promise((res, rej) => {
        http.get(`http://localhost:${portDesk}/json/list`, r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => res(JSON.parse(d)));
        }).on('error', rej);
      });
      if (tabsDesk && tabsDesk[0]?.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const tabDesk = tabsDesk.find(t => t.url.includes('localhost')) || tabsDesk[0];
  const wsDesk = new WebSocket(tabDesk.webSocketDebuggerUrl);

  let idDesk = 1;
  const pendingDesk = new Map();
  function sendDesk(method, params = {}) {
    return new Promise((resolve, reject) => {
      const myId = idDesk++;
      pendingDesk.set(myId, { resolve, reject });
      wsDesk.send(JSON.stringify({ id: myId, method, params }));
    });
  }
  wsDesk.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pendingDesk.has(msg.id)) {
      const { resolve, reject } = pendingDesk.get(msg.id);
      pendingDesk.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => wsDesk.onopen = r);
  await sendDesk('Page.enable');
  await sendDesk('DOM.enable');

  await new Promise(r => setTimeout(r, 600));

  // 1. Desktop Hero
  let shot = await sendDesk('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'desktop-clean-hero.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved desktop-clean-hero.png');

  // 2. Desktop Portfolio (Banner 3D visible, Spheres visible, 2 cards HIDDEN)
  await sendDesk('Runtime.evaluate', {
    expression: 'document.getElementById("portfolio").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 300));
  shot = await sendDesk('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'desktop-portfolio-3d-banner.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved desktop-portfolio-3d-banner.png');

  const deskChecks = await sendDesk('Runtime.evaluate', {
    expression: `({
      banner3dDisplay: window.getComputedStyle(document.querySelector('.portfolio-mathias-banner')).display,
      mobileCardsDisplay: window.getComputedStyle(document.querySelector('.mobile-only-showcase')).display,
      precoDisplay: window.getComputedStyle(document.getElementById('preco')).display,
      comoFuncionaDisplay: window.getComputedStyle(document.getElementById('como-funciona')).display
    })`,
    returnByValue: true
  });
  console.log('Desktop Visibility Check:', deskChecks.result.value);

  // 3. Open 3D Modal on Desktop & Check Dropdown
  await sendDesk('Runtime.evaluate', {
    expression: 'document.getElementById("btnOpenMathiasGallery").click()'
  });
  await new Promise(r => setTimeout(r, 600));

  // Click category dropdown trigger
  await sendDesk('Runtime.evaluate', {
    expression: 'document.getElementById("btnCategoryTrigger").click()'
  });
  await new Promise(r => setTimeout(r, 300));
  shot = await sendDesk('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'desktop-3d-modal-dropdown-open.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved desktop-3d-modal-dropdown-open.png');

  // Choose Academia in dropdown
  await sendDesk('Runtime.evaluate', {
    expression: 'document.querySelector(".category-select-item[data-category=\'academia\']").click()'
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await sendDesk('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'desktop-3d-modal-academia-chosen.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved desktop-3d-modal-academia-chosen.png');

  // Close modal
  await sendDesk('Runtime.evaluate', {
    expression: 'document.getElementById("btnCloseMathiasGallery").click()'
  });
  await new Promise(r => setTimeout(r, 400));

  // Test Sphere Preço click
  await sendDesk('Runtime.evaluate', {
    expression: 'document.querySelector(".js-trigger-preco").click()'
  });
  await new Promise(r => setTimeout(r, 500));
  const precoAfterClick = await sendDesk('Runtime.evaluate', {
    expression: 'window.getComputedStyle(document.getElementById("preco")).display',
    returnByValue: true
  });
  console.log('Preço display after sphere click:', precoAfterClick.result.value);

  wsDesk.close();
  procDesk.kill();

  // ==========================================
  // PART 2: MOBILE VERIFICATION (390x844)
  // ==========================================
  console.log('--- TESTING MOBILE (CELLPHONE) ---');
  const portMob = 9320;
  const userDirMob = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_mob_${Date.now()}`;
  const procMob = spawn(chromePath, [
    'http://localhost:3000/',
    `--remote-debugging-port=${portMob}`,
    '--headless=new',
    `--user-data-dir=${userDirMob}`,
    '--disable-gpu',
    '--window-size=390,844',
    '--no-first-run'
  ]);

  let tabsMob = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      tabsMob = await new Promise((res, rej) => {
        http.get(`http://localhost:${portMob}/json/list`, r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => res(JSON.parse(d)));
        }).on('error', rej);
      });
      if (tabsMob && tabsMob[0]?.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const tabMob = tabsMob.find(t => t.url.includes('localhost')) || tabsMob[0];
  const wsMob = new WebSocket(tabMob.webSocketDebuggerUrl);

  let idMob = 1;
  const pendingMob = new Map();
  function sendMob(method, params = {}) {
    return new Promise((resolve, reject) => {
      const myId = idMob++;
      pendingMob.set(myId, { resolve, reject });
      wsMob.send(JSON.stringify({ id: myId, method, params }));
    });
  }
  wsMob.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pendingMob.has(msg.id)) {
      const { resolve, reject } = pendingMob.get(msg.id);
      pendingMob.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => wsMob.onopen = r);
  await sendMob('Page.enable');
  await sendMob('DOM.enable');
  await sendMob('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await new Promise(r => setTimeout(r, 600));

  // 1. Mobile Hero (Ultra-clean, almost no text)
  shot = await sendMob('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'mobile-clean-hero-persona.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved mobile-clean-hero-persona.png');

  // 2. Mobile Portfolio (3D Banner HIDDEN, Spheres VISIBLE, Cards Academia/Doceria VISIBLE)
  await sendMob('Runtime.evaluate', {
    expression: 'document.getElementById("portfolio").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 300));
  shot = await sendMob('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'mobile-portfolio-spheres-and-cards.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved mobile-portfolio-spheres-and-cards.png');

  // Scroll slightly down to see Academia VoltFit card
  await sendMob('Runtime.evaluate', {
    expression: 'document.getElementById("modelo-essencial").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 300));
  shot = await sendMob('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'mobile-card-academia-voltfit.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved mobile-card-academia-voltfit.png');

  const mobChecks = await sendMob('Runtime.evaluate', {
    expression: `({
      banner3dDisplay: window.getComputedStyle(document.querySelector('.portfolio-mathias-banner')).display,
      mobileCardsDisplay: window.getComputedStyle(document.querySelector('.mobile-only-showcase')).display,
      precoDisplay: window.getComputedStyle(document.getElementById('preco')).display,
      comoFuncionaDisplay: window.getComputedStyle(document.getElementById('como-funciona')).display
    })`,
    returnByValue: true
  });
  console.log('Mobile Visibility Check:', mobChecks.result.value);

  wsMob.close();
  procMob.kill();
  console.log('All verification finished successfully!');
}

verifyAll().catch(e => {
  console.error('Verification error:', e);
  process.exit(1);
});

