const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testButtonsClick() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';
  const port = 9330;
  const userDir = `C:\\Users\\davix\\AppData\\Local\\Temp\\chrome_btn_${Date.now()}`;

  const proc = spawn(chromePath, [
    'http://localhost:3000/#mais-informacoes',
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--window-size=1280,800',
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

  const consoleErrors = [];
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
    }
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
  await send('DOM.enable');

  await new Promise(r => setTimeout(r, 600));

  console.log('Console Errors at load:', consoleErrors);

  // 1. Check initial display state
  const initialDisplays = await send('Runtime.evaluate', {
    expression: `({
      promessa: window.getComputedStyle(document.getElementById('panel-promessa')).display,
      problema: window.getComputedStyle(document.getElementById('panel-problema')).display,
      faq: window.getComputedStyle(document.getElementById('panel-faq')).display
    })`,
    returnByValue: true
  });
  console.log('Initial panel displays:', initialDisplays.result.value);

  // 2. Click on Button 1 (Diferenciais)
  console.log('Clicking Button 1 (Diferenciais)...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".btn-extra-tab[data-target=\'panel-promessa\']").click()'
  });
  await new Promise(r => setTimeout(r, 400));

  const afterClick1 = await send('Runtime.evaluate', {
    expression: `({
      promessa: window.getComputedStyle(document.getElementById('panel-promessa')).display,
      btn1Active: document.querySelector(".btn-extra-tab[data-target='panel-promessa']").classList.contains('is-active')
    })`,
    returnByValue: true
  });
  console.log('After clicking button 1:', afterClick1.result.value);

  // Capture screenshot of opened panel 1
  let shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'test-panel-promessa-opened.png'), Buffer.from(shot.data, 'base64'));

  // 3. Click on Button 2 (Realidade do Mercado)
  console.log('Clicking Button 2 (Realidade do Mercado)...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".btn-extra-tab[data-target=\'panel-problema\']").click()'
  });
  await new Promise(r => setTimeout(r, 400));

  const afterClick2 = await send('Runtime.evaluate', {
    expression: `({
      promessa: window.getComputedStyle(document.getElementById('panel-promessa')).display,
      problema: window.getComputedStyle(document.getElementById('panel-problema')).display,
      btn2Active: document.querySelector(".btn-extra-tab[data-target='panel-problema']").classList.contains('is-active')
    })`,
    returnByValue: true
  });
  console.log('After clicking button 2:', afterClick2.result.value);

  shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'test-panel-problema-opened.png'), Buffer.from(shot.data, 'base64'));

  // 4. Click on Button 3 (FAQ)
  console.log('Clicking Button 3 (FAQ)...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".btn-extra-tab[data-target=\'panel-faq\']").click()'
  });
  await new Promise(r => setTimeout(r, 400));

  const afterClick3 = await send('Runtime.evaluate', {
    expression: `({
      problema: window.getComputedStyle(document.getElementById('panel-problema')).display,
      faq: window.getComputedStyle(document.getElementById('panel-faq')).display,
      btn3Active: document.querySelector(".btn-extra-tab[data-target='panel-faq']").classList.contains('is-active')
    })`,
    returnByValue: true
  });
  console.log('After clicking button 3:', afterClick3.result.value);

  shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(artifactDir, 'test-panel-faq-opened.png'), Buffer.from(shot.data, 'base64'));

  // 5. Click on Hide Button inside panel-faq
  console.log('Clicking Hide Button in FAQ...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector("#panel-faq .btn-panel-hide").click()'
  });
  await new Promise(r => setTimeout(r, 400));

  const afterClose = await send('Runtime.evaluate', {
    expression: `({
      faq: window.getComputedStyle(document.getElementById('panel-faq')).display,
      btn3Active: document.querySelector(".btn-extra-tab[data-target='panel-faq']").classList.contains('is-active')
    })`,
    returnByValue: true
  });
  console.log('After clicking hide button:', afterClose.result.value);

  console.log('Total Console Errors throughout test:', consoleErrors);

  ws.close();
  proc.kill();
  console.log('Test completed successfully!');
}

testButtonsClick().catch(e => {
  console.error('Error during test:', e);
  process.exit(1);
});

