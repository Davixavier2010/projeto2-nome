const fs = require('fs');

// 1. Remove Glacy from script.js
let js = fs.readFileSync('script.js', 'utf8');

const glacyBlock = `    {
      id: 'glacy',
      name: 'Glacy • Café & Bistrô',
      category: 'cafeteria',
      categoryName: 'Cafeteria & Bistrô',
      niche: 'Cafeteria, Restaurante Executivo & Pratos',
      plan: 'essencial',
      planLabel: 'Plano Essencial',
      price: 'Setup R$ 497 (2x R$ 248,50)',
      monthly: 'R$ 47/mês',
      url: 'https://glacy.vercel.app/',
      displayUrl: 'glacy.vercel.app',
      image: 'assets/images/gallery/site-glacy.jpg'
    },
`;

const normJs = js.replace(/\r\n/g, '\n');
const normGlacy = glacyBlock.replace(/\r\n/g, '\n');

if (normJs.includes(normGlacy)) {
  js = normJs.replace(normGlacy, '');
  fs.writeFileSync('script.js', js, 'utf8');
  console.log('[OK] Glacy removed from script.js');
} else {
  console.error('[ERROR] Glacy block not found in script.js');
  process.exit(1);
}

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// Update 9 modelos to 8 modelos
html = html.replace('Galeria curva interativa com 9 modelos reais', 'Galeria curva interativa com 8 modelos reais');
html = html.replace('Todos (9 modelos)', 'Todos (8 modelos)');

// Bump cache to v=9.3
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=9.3');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=9.3');

fs.writeFileSync('index.html', html, 'utf8');
console.log('[OK] index.html updated with 8 models and cache v=9.3');
