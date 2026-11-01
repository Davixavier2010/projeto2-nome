const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testMobileFinal() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9260;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_mob_fin_${Date.now()}`;
  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

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
  await new Promise(r => setTimeout(r, 800));

  // 1. Scroll to portfolio section
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      const p = document.getElementById('portfolio');
      if (p) p.scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 400));

  let shotPortfolio = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-portfolio-aligned.png'), Buffer.from(shotPortfolio.data, 'base64'));
  console.log('Saved mobile-portfolio-aligned.png');

  // 2. Open 3D Gallery Modal
  await send('Runtime.evaluate', {
    expression: `document.getElementById('btnOpenMathiasGallery').click();`
  });
  await new Promise(r => setTimeout(r, 600));

  // Verify bounding rects of modal elements
  const metrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('.mathias-header');
      const stage = document.querySelector('.stage-3d-wrapper');
      const cylinder = document.querySelector('.carousel-cylinder');
      const bottom = document.querySelector('.mathias-bottom-bar');
      const card = document.querySelector('.project-card-3d.is-active');
      const getBox = el => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, left: b.left, right: b.right, width: b.width, height: b.height };
      };
      return {
        scrollY: window.scrollY,
        header: getBox(header),
        stage: getBox(stage),
        cylinder: getBox(cylinder),
        card: getBox(card),
        bottom: getBox(bottom)
      };
    })()`,
    returnByValue: true
  });
  console.log('3D Modal Metrics on Mobile:', JSON.stringify(metrics.result.value, null, 2));

  let shotCard1 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-3d-gallery-card1.png'), Buffer.from(shotCard1.data, 'base64'));
  console.log('Saved mobile-3d-gallery-card1.png');

  // 3. Click next arrow
  await send('Runtime.evaluate', {
    expression: `document.getElementById('mathiasBtnNext').click();`
  });
  await new Promise(r => setTimeout(r, 500));

  let shotCard2 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-3d-gallery-card2.png'), Buffer.from(shotCard2.data, 'base64'));
  console.log('Saved mobile-3d-gallery-card2.png');

  // 4. Test filter pill click: "Plano Personalizado"
  await send('Runtime.evaluate', {
    expression: `
      const pill = document.querySelector('.mathias-filter-btn[data-filter="personalizado"]');
      if (pill) pill.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  let shotFilter = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-3d-gallery-personalizado.png'), Buffer.from(shotFilter.data, 'base64'));
  console.log('Saved mobile-3d-gallery-personalizado.png');

  // 5. Test Close Modal
  await send('Runtime.evaluate', {
    expression: `document.getElementById('btnCloseMathiasGallery').click();`
  });
  await new Promise(r => setTimeout(r, 500));

  const afterClose = await send('Runtime.evaluate', {
    expression: `(() => {
      const modal = document.getElementById('mathiasGalleryModal');
      return {
        display: modal.style.display,
        isOpen: modal.classList.contains('is-open'),
        scrollY: window.scrollY
      };
    })()`,
    returnByValue: true
  });
  console.log('After close:', afterClose.result.value);

  ws.close();
  proc.kill();
  console.log('All mobile tests completed successfully!');
}

testMobileFinal().catch(console.error);

