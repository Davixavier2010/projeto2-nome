const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function generateAllFinalArtifacts() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9233;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_final_${Date.now()}`;
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

  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
    `
  });

  // 1. Capture mobile portfolio section
  await send('Runtime.evaluate', {
    expression: `
      const p = document.getElementById('portfolio');
      if (p) p.scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 500));
  let vp = (await send('Runtime.evaluate', {
    expression: '({ scrollY: window.scrollY, innerH: window.innerHeight, innerW: window.innerWidth })',
    returnByValue: true
  })).result.value;

  let shotPort = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: vp.scrollY, width: vp.innerW, height: vp.innerH, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-portfolio-aligned.png'), Buffer.from(shotPort.data, 'base64'));
  console.log('Saved mobile-portfolio-aligned.png');

  // 2. Open 3D Modal -> Card 1 (Glacy)
  await send('Runtime.evaluate', {
    expression: `document.getElementById('btnOpenMathiasGallery').click();`
  });
  await new Promise(r => setTimeout(r, 600));

  vp = (await send('Runtime.evaluate', {
    expression: '({ scrollY: window.scrollY, innerH: window.innerHeight, innerW: window.innerWidth })',
    returnByValue: true
  })).result.value;

  let shot1 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: vp.scrollY, width: vp.innerW, height: vp.innerH, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-3d-gallery-card1.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved mobile-3d-gallery-card1.png');

  // 3. Next -> Card 2 (Academia)
  await send('Runtime.evaluate', {
    expression: `document.getElementById('mathiasBtnNext').click();`
  });
  await new Promise(r => setTimeout(r, 600));

  let shot2 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: vp.scrollY, width: vp.innerW, height: vp.innerH, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-3d-gallery-card2.png'), Buffer.from(shot2.data, 'base64'));
  console.log('Saved mobile-3d-gallery-card2.png');

  // 4. Filter -> "Plano Personalizado"
  await send('Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('.mathias-filter-btn[data-filter="personalizado"]');
      if (btn) btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 700));

  let shot3 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: vp.scrollY, width: vp.innerW, height: vp.innerH, scale: 2 }
  });
  fs.writeFileSync(path.join(artifactDir, 'mobile-3d-gallery-personalizado.png'), Buffer.from(shot3.data, 'base64'));
  console.log('Saved mobile-3d-gallery-personalizado.png');

  ws.close();
  proc.kill();
  console.log('Artifacts generated successfully!');
}

generateAllFinalArtifacts().catch(console.error);

