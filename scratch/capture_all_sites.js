const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const sites = [
  { id: 'glacy', name: 'Glacy Café & Bistrô', niche: 'Cafeteria & Restaurante', plan: 'essencial', planLabel: 'Plano Essencial', price: 'Setup R$ 497 • R$ 47/mês', url: 'https://glacy.vercel.app/' },
  { id: 'academia', name: 'Academia Rida', niche: 'Fitness & Musculação', plan: 'essencial', planLabel: 'Plano Essencial', price: 'Setup R$ 497 • R$ 47/mês', url: 'https://academiarida-ashen.vercel.app/' },
  { id: 'salao', name: 'Salão de Beleza Rida', niche: 'Estética & Cabeleireiro', plan: 'essencial', planLabel: 'Plano Essencial', price: 'Setup R$ 497 • R$ 47/mês', url: 'https://salaorida.vercel.app/#inicio' },
  { id: 'petshop', name: 'Pet Shop Rida', niche: 'Banho, Tosa & Vet', plan: 'essencial', planLabel: 'Plano Essencial', price: 'Setup R$ 497 • R$ 47/mês', url: 'https://petshoprida.vercel.app/' },
  { id: 'doceria', name: 'Doceria Gourmet Rida', niche: 'Confeitaria Artesanal', plan: 'personalizado', planLabel: 'Plano Personalizado', price: 'Setup R$ 697 • R$ 67/mês', url: 'https://doceriarida.vercel.app/' },
  { id: 'padaria', name: 'Padaria Prestígio 1986', niche: 'Panificação Tradicional', plan: 'personalizado', planLabel: 'Plano Personalizado', price: 'Setup R$ 697 • R$ 67/mês', url: 'https://padaria-prestigio.vercel.app/' },
  { id: 'jornalismo', name: 'Portal de Jornalismo', niche: 'Notícias & Blog', plan: 'personalizado', planLabel: 'Plano Personalizado', price: 'Setup R$ 697 • R$ 67/mês', url: 'https://jornalismo-rida.vercel.app/' },
];

async function captureOne(site) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9750 + Math.floor(Math.random() * 200);
  const userDir = path.join(os.tmpdir(), `ch_gal_${site.id}_${Date.now()}`);

  const targetUrl = site.url.split('#')[0];
  console.log(`[${site.id}] Starting Chrome on port ${port} for ${targetUrl}...`);

  const proc = spawn(chromePath, [
    targetUrl,
    `--remote-debugging-port=${port}`,
    '--headless=new',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1280,820',
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

  // Wait 3.5s for fonts & images to render
  await new Promise(r => setTimeout(r, 3500));

  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88 });
  const outDir = path.resolve(__dirname, '../assets/images/gallery');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileName = `site-${site.id}.jpg`;
  const filePath = path.join(outDir, fileName);
  fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
  console.log(`✓ [${site.id}] Saved ${fileName} (${fs.statSync(filePath).size} bytes)`);

  ws.close();
  proc.kill();
}

async function run() {
  for (const site of sites) {
    try {
      await captureOne(site);
    } catch (err) {
      console.error(`Failed ${site.id}:`, err.message);
    }
  }
  console.log('ALL SITES CAPTURED SUCCESSFULLY!');
  process.exit(0);
}

run();
