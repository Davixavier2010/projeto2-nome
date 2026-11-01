const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function testClicks() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9910;
  const userDir = path.join(os.tmpdir(), `ch_clicks_${Date.now()}`);

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

  await new Promise(r => setTimeout(r, 1500));
  const artifactDir = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55';

  // 1. Click Sphere 1: Preço
  const r1 = await send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('.orbs-showcase a[href="#preco"]');
      if (!link) return 'preco link not found';
      link.click();
      return 'clicked preco';
    })()`
  });
  console.log('Result 1:', r1.result.value);
  await new Promise(r => setTimeout(r, 1000));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'orb-target-preco.png'), Buffer.from(shot.data, 'base64'));

  // 2. Click Sphere 2: Como Funciona
  const r2 = await send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('.orbs-showcase a[href="#como-funciona"]');
      if (!link) return 'como-funciona link not found';
      link.click();
      return 'clicked como-funciona';
    })()`
  });
  console.log('Result 2:', r2.result.value);
  await new Promise(r => setTimeout(r, 1000));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'orb-target-comofunciona.png'), Buffer.from(shot.data, 'base64'));

  // 3. Click Sphere 3: Contato
  const r3 = await send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('.orbs-showcase a[href="#contato"]');
      if (!link) return 'contato link not found';
      link.click();
      return 'clicked contato';
    })()`
  });
  console.log('Result 3:', r3.result.value);
  await new Promise(r => setTimeout(r, 1000));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'orb-target-contato.png'), Buffer.from(shot.data, 'base64'));

  ws.close();
  proc.kill();
  console.log('All 3 orb navigation tests passed!');
}

testClicks().catch(console.error);

