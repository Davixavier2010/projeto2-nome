const fs = require('fs');

// 1. Update script.js
let js = fs.readFileSync('script.js', 'utf8');

const oldBistroTenis = `    {
      id: 'bistro',
      name: 'Le Petit Bleu • Café & Bistrô Francês',
      category: 'cafeteria',
      categoryName: 'Café & Bistrô Francês',
      niche: 'Viennoiserie Artesanal, Brunch & Gastronomia',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 797 (2x R$ 398,50)',
      monthly: 'R$ 77/mês',
      url: 'http://localhost:5177/',
      displayUrl: 'lepetitbleu.vercel.app',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 'tenis',
      name: 'RIDANIS LAB • Tênis de Alta Performance',
      category: 'ecommerce',
      categoryName: 'Calçados & Esportes 3D',
      niche: 'Biomecânica de Propulsão & Vitrine 3D',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 797 (2x R$ 398,50)',
      monthly: 'R$ 77/mês',
      url: 'http://localhost:5178/',
      displayUrl: 'ridanis.vercel.app',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'
    }`;

const newBistroTenis = `    {
      id: 'bistro',
      name: 'Le Petit Bleu • Café & Bistrô Francês',
      category: 'cafeteria',
      categoryName: 'Café & Bistrô Francês',
      niche: 'Viennoiserie Artesanal, Brunch & Gastronomia',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 797 (2x R$ 398,50)',
      monthly: 'R$ 77/mês',
      url: 'https://rida-cafeteria.vercel.app/',
      displayUrl: 'rida-cafeteria.vercel.app',
      image: 'assets/images/gallery/site-bistro.jpg'
    },
    {
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
    }`;

// Normalize CRLF in target if needed
const normOld = oldBistroTenis.replace(/\r\n/g, '\n');
const normJs = js.replace(/\r\n/g, '\n');

if (normJs.includes(normOld)) {
  js = normJs.replace(normOld, newBistroTenis.replace(/\r\n/g, '\n'));
  fs.writeFileSync('script.js', js, 'utf8');
  console.log('[OK] Updated script.js with live Vercel URLs for bistro and tenis');
} else {
  console.error('[ERROR] Target block not found in script.js');
  process.exit(1);
}

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// Update 3D gallery button subtitle if it says 7 modelos
html = html.replace('Galeria curva interativa com 7 modelos reais', 'Galeria curva interativa com 9 modelos reais');

// Add the two new cards to mobile-only-showcase
const targetEndCard = `                <a href="https://doceriarida.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>`;

const newCards = `                <a href="https://doceriarida.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>

            <!-- Modelo 03: Plano Personalizado (Le Petit Bleu • Café & Bistrô Francês) -->
            <article class="portfolio-card featured-project" id="modelo-cafeteria">
              <div class="portfolio-mockup-wrapper">
                <div class="card-orb-badge badge-destaque">
                  <div class="mini-sphere sphere-gold"></div>
                  <span>Plano Personalizado • Destaque</span>
                </div>
                <div class="phone-device-frame">
                  <img src="assets/images/mockup-cafeteria.png" alt="Site Le Petit Bleu Café &amp; Bistrô - Exemplo Plano Personalizado" class="phone-device-screen">
                </div>
                <button class="btn-preview-zoom js-zoom-trigger" data-target="assets/images/mockup-cafeteria.png" data-title="Le Petit Bleu • Café &amp; Bistrô (Exemplo do Plano Personalizado)" aria-label="Ampliar Modelo Café &amp; Bistrô">
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
                <div class="portfolio-niche">Cafeteria, Bistrô &amp; Gastronomia Artesanal</div>
                <h3 class="portfolio-item-title">Le Petit Bleu • Café &amp; Bistrô</h3>
                <p class="portfolio-item-focus">
                  <strong>Modelo do Plano Personalizado:</strong> Apresentação gastronômica sofisticada com cardápio digital completo, brunch autoral, reserva de mesas e atmosfera francesa sob medida.
                </p>
                <div class="portfolio-features">
                  <span>✓ Cardápio Digital Completo de Especialidades</span>
                  <span>✓ Design Editorial Elegante &amp; Exclusivo</span>
                  <span>✓ Galeria de Ambientes e Pratos em Alta Resolução</span>
                  <span>✓ Botão Direto para Reservas no WhatsApp</span>
                  <span>✓ Localização e Horários de Atendimento Integrados</span>
                </div>
                <a href="https://rida-cafeteria.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>

            <!-- Modelo 04: Plano Personalizado (RIDANIS LAB • Tênis de Alta Performance) -->
            <article class="portfolio-card featured-project" id="modelo-tenis">
              <div class="portfolio-mockup-wrapper">
                <div class="card-orb-badge badge-destaque">
                  <div class="mini-sphere sphere-gold"></div>
                  <span>Plano Personalizado • Destaque</span>
                </div>
                <div class="phone-device-frame">
                  <img src="assets/images/mockup-tenis.png" alt="Site RIDANIS LAB Tênis - Exemplo Plano Personalizado" class="phone-device-screen">
                </div>
                <button class="btn-preview-zoom js-zoom-trigger" data-target="assets/images/mockup-tenis.png" data-title="RIDANIS LAB • Tênis (Exemplo do Plano Personalizado)" aria-label="Ampliar Modelo RIDANIS LAB">
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
                <div class="portfolio-niche">Calçados, Esportes &amp; Vitrine Tecnológica</div>
                <h3 class="portfolio-item-title">RIDANIS LAB • Tênis de Performance</h3>
                <p class="portfolio-item-focus">
                  <strong>Modelo do Plano Personalizado:</strong> Landing page com visual de alta tecnologia, destaque de especificações técnicas, biomecânica e vitrine interativa para conversão rápida.
                </p>
                <div class="portfolio-features">
                  <span>✓ Vitrine de Produtos com Detalhamento Tecnológico</span>
                  <span>✓ Design Futurista de Alta Performance</span>
                  <span>✓ Galeria de Detalhes, Solado e Materiais</span>
                  <span>✓ Chamada Estratégica para Compra e WhatsApp</span>
                  <span>✓ Estrutura 100% Otimizada para Celular</span>
                </div>
                <a href="https://rida-tenis.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>`;

if (html.includes(targetEndCard)) {
  html = html.replace(targetEndCard, newCards);
  console.log('[OK] Added Le Petit Bleu and RIDANIS LAB cards to mobile showcase in index.html');
} else {
  console.error('[ERROR] targetEndCard not found in index.html');
  process.exit(1);
}

// Bump cache
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=9.2');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=9.2');

fs.writeFileSync('index.html', html, 'utf8');
console.log('[OK] Updated index.html successfully with cache v=9.2');
