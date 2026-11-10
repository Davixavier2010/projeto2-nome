const fs = require('fs');

// 1. Update script.js
let js = fs.readFileSync('script.js', 'utf8').replace(/\r\n/g, '\n');

const targetTenisEnd = `    {
      id: 'tenis',
      name: 'RIDANIS LAB • Tênis de Alta Performance',
      category: 'ecommerce',
      categoryName: 'Calçados & Esportes 3D',
      niche: 'Biomecânica de Propulsão & Vitrine 3D',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 797 (2x R$ 398,50)',
      monthly: 'R$ 77/mês',
      url: 'https://rida-tenis.vercel.app/',
      displayUrl: 'rida-tenis.vercel.app',
      image: 'assets/images/gallery/site-tenis.jpg'
    }
  ];`;

const replacementProjects = `    {
      id: 'tenis',
      name: 'RIDANIS LAB • Tênis de Alta Performance',
      category: 'ecommerce',
      categoryName: 'Calçados & Esportes 3D',
      niche: 'Biomecânica de Propulsão & Vitrine 3D',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 797 (2x R$ 398,50)',
      monthly: 'R$ 77/mês',
      url: 'https://rida-tenis.vercel.app/',
      displayUrl: 'rida-tenis.vercel.app',
      image: 'assets/images/gallery/site-tenis.jpg'
    },
    {
      id: 'sorveteria',
      name: 'RIDA GELATO • Sorvetes Artesanais',
      category: 'sorveteria',
      categoryName: 'Sorveteria & Gelato',
      niche: 'Sorvetes Artesanais, Potes 473ml & Frutas Tropicais',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 797 (2x R$ 398,50)',
      monthly: 'R$ 77/mês',
      url: 'https://rida-sorveteria.vercel.app/',
      displayUrl: 'rida-sorveteria.vercel.app',
      image: 'assets/images/gallery/site-sorveteria.jpg'
    }
  ];`;

if (js.includes(targetTenisEnd)) {
  js = js.replace(targetTenisEnd, replacementProjects);
  fs.writeFileSync('script.js', js, 'utf8');
  console.log('[OK] Added sorveteria to script.js');
} else {
  console.error('[ERROR] targetTenisEnd not found in script.js');
  process.exit(1);
}

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// Update 8 modelos -> 9 modelos
html = html.replace('Galeria curva interativa com 8 modelos reais', 'Galeria curva interativa com 9 modelos reais');
html = html.replace('Todos (8 modelos)', 'Todos (9 modelos)');

// Add category to dropdown
const targetDropdownEnd = `<button type="button" class="category-select-item" data-category="ecommerce">Esportes & 3D</button>
        </div>`;

const replacementDropdownEnd = `<button type="button" class="category-select-item" data-category="ecommerce">Esportes & 3D</button>
          <button type="button" class="category-select-item" data-category="sorveteria">Sorveteria & Gelato</button>
        </div>`;

if (html.includes(targetDropdownEnd)) {
  html = html.replace(targetDropdownEnd, replacementDropdownEnd);
  console.log('[OK] Added Sorveteria & Gelato to category dropdown in index.html');
} else {
  console.error('[ERROR] targetDropdownEnd not found in index.html');
  process.exit(1);
}

// Add mobile card
const targetTenisCardEnd = `                <a href="https://rida-tenis.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>`;

const sorveteriaCard = `                <a href="https://rida-tenis.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>

            <!-- Modelo 05: Plano Personalizado (RIDA GELATO • Sorvetes Tropicais Artesanais) -->
            <article class="portfolio-card featured-project" id="modelo-sorveteria">
              <div class="portfolio-mockup-wrapper">
                <div class="card-orb-badge badge-destaque">
                  <div class="mini-sphere sphere-gold"></div>
                  <span>Plano Personalizado • Destaque</span>
                </div>
                <div class="phone-device-frame">
                  <img src="assets/images/mockup-sorveteria.png" alt="Site RIDA GELATO Sorvetes Tropicais - Exemplo Plano Personalizado" class="phone-device-screen">
                </div>
                <button class="btn-preview-zoom js-zoom-trigger" data-target="assets/images/mockup-sorveteria.png" data-title="RIDA GELATO • Sorvetes Artesanais (Exemplo do Plano Personalizado)" aria-label="Ampliar Modelo RIDA GELATO">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>Ver em Tela Cheia</span>
                </button>
              </div>
              <div class="portfolio-info">
                <div class="portfolio-plan-pill plan-pill-personalizado">
                  <span class="plan-pill-title">Plano Personalizado</span>
                  <span class="plan-pill-price">Setup R$ 797 (ou 2x R$ 398,50) • R$ 77/mês</span>
                </div>
                <div class="portfolio-niche">Sorveteria, Gelato Artesanal &amp; Sobremesas</div>
                <h3 class="portfolio-item-title">RIDA GELATO • Sorvetes Artesanais</h3>
                <p class="portfolio-item-focus">
                  <strong>Modelo do Plano Personalizado:</strong> Landing page de alta conversão para sorvetes e gelatos, com vitrine interativa 360°, seleção dinâmica de sabores, combos e pedidos diretos no WhatsApp.
                </p>
                <div class="portfolio-features">
                  <span>✓ Vitrine de Sabores Interativa &amp; Visual Tropical</span>
                  <span>✓ Apresentação de Potes Colecionáveis de 473ml</span>
                  <span>✓ Seletor de Sabores e Informações Nutricionais</span>
                  <span>✓ Botão de Pedidos Direto no WhatsApp</span>
                  <span>✓ Design Responsivo de Alta Conversão</span>
                </div>
                <a href="https://rida-sorveteria.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>`;

if (html.includes(targetTenisCardEnd)) {
  html = html.replace(targetTenisCardEnd, sorveteriaCard);
  console.log('[OK] Added RIDA GELATO card to mobile showcase in index.html');
} else {
  console.error('[ERROR] targetTenisCardEnd not found in index.html');
  process.exit(1);
}

// Bump cache to v=9.4
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=9.4');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=9.4');

fs.writeFileSync('index.html', html, 'utf8');
console.log('[OK] index.html updated successfully with cache v=9.4');
