const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function runVisualVerification() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9260;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_verify_${Date.now()}`;
  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

  const proc = spawn(chromePath, [
    'http://localhost:3000/',
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
  await send('DOM.enable');

  // Emulate iPhone / Android mobile device metrics
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36'
  });

  // Helper to capture current viewport
  async function captureViewport(name) {
    const evalRes = await send('Runtime.evaluate', {
      expression: '({ scrollY: window.scrollY, innerH: window.innerHeight, innerW: window.innerWidth })',
      returnByValue: true
    });
    const { scrollY, innerH, innerW } = evalRes.result.value;
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: scrollY, width: innerW, height: innerH, scale: 2 }
    });
    const filePath = path.join(artifactDir, name);
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${name}`);
  }

  // 1. Initial Hero Screen
  await new Promise(r => setTimeout(r, 600));
  await captureViewport('mobile-hero-screen.png');

  // 2. Scroll to Portfolio Section (Nossos Projetos + Spheres + 3D Banner)
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("portfolio").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 400));
  await captureViewport('mobile-portfolio-spheres.png');

  // 3. Scroll to Extra Hub (#mais-informacoes)
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("mais-informacoes").scrollIntoView({ behavior: "instant", block: "start" })'
  });
  await new Promise(r => setTimeout(r, 400));
  await captureViewport('mobile-extra-hub-buttons.png');

  // 4. Click first extra tab [ 📌 Por Que Nos Escolher? ]
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".btn-extra-tab[data-target=\'panel-promessa\']").click()'
  });
  await new Promise(r => setTimeout(r, 500));
  await captureViewport('mobile-extra-hub-expanded.png');

  // 5. Open 3D Gallery Modal
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("btnOpenMathiasGallery").click()'
  });
  await new Promise(r => setTimeout(r, 800));
  await captureViewport('mobile-3d-modal-all-categories.png');

  // Check that floating WhatsApp is hidden and mainContent is hidden
  const isolationCheck = await send('Runtime.evaluate', {
    expression: `({
      waDisplay: window.getComputedStyle(document.querySelector('.floating-whatsapp-wrapper')).display,
      mainVisibility: window.getComputedStyle(document.getElementById('mainContent')).visibility,
      modalZIndex: window.getComputedStyle(document.getElementById('mathiasGalleryModal')).zIndex,
      modalBg: window.getComputedStyle(document.getElementById('mathiasGalleryModal')).backgroundColor
    })`,
    returnByValue: true
  });
  console.log('Modal Isolation Check:', isolationCheck.result.value);

  // 6. Click on Padaria category
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".mathias-cat-btn[data-category=\'padaria\']").click()'
  });
  await new Promise(r => setTimeout(r, 600));
  await captureViewport('mobile-3d-category-padaria.png');

  // 7. Click on Pet Shop category
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".mathias-cat-btn[data-category=\'petshop\']").click()'
  });
  await new Promise(r => setTimeout(r, 600));
  await captureViewport('mobile-3d-category-petshop.png');

  // 8. Click on Cafeteria category
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".mathias-cat-btn[data-category=\'cafeteria\']").click()'
  });
  await new Promise(r => setTimeout(r, 600));
  await captureViewport('mobile-3d-category-cafeteria.png');

  // Cleanup
  ws.close();
  proc.kill();
  console.log('Verification finished successfully!');
}

runVisualVerification().catch(e => {
  console.error('Verification error:', e);
  process.exit(1);
});

