const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// ==============================================================================
// 1. CLEAN UP HERO SECTION (QUASE SEM TEXTO ALGUM)
// ==============================================================================
const heroRegex = /<!-- ================= 1\. CABEÇALHO \(HERO SECTION - ENXUTO & MADURO\) ================= -->[\s\S]*?<!-- ================= 2\. O PORTFÓLIO \(A VITRINE\) ================= -->/;

const newHeroHtml = `<!-- ================= 1. CABEÇALHO (HERO SECTION - MINIMALISTA) ================= -->
    <section class="hero-section" id="inicio">
      <div class="container hero-grid">
        <div class="hero-content">
          
          <!-- Identidade no Início do Site -->
          <div class="hero-brand-top">
            <div class="hero-logo-box">
              <img src="assets/images/logo-rida.png" alt="Logo Rida" class="hero-logo-img">
            </div>
            <div class="hero-brand-meta">
              <span class="hero-brand-title">RIDA</span>
              <span class="hero-brand-badge">Sites Profissionais</span>
            </div>
          </div>

          <div class="badge-pill">
            <span class="badge-dot"></span>
            <span>Sites Profissionais para Comércios e Empresas</span>
          </div>

          <!-- Título Principal (Direto e Sem Enrolação) -->
          <h1 class="hero-title">
            Presença digital e <span class="highlight-title">clientes no WhatsApp</span> para seu negócio.
          </h1>

          <!-- Subtítulo Ultracurto -->
          <p class="hero-subtitle">
            Criamos seu site completo, rápido e focado em vendas.
          </p>

          <!-- Botões Principais -->
          <div class="hero-actions">
            <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20um%20site%20profissional%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
              <span class="whatsapp-icon-circle">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
                </svg>
              </span>
              <span>Quero Meu Site no WhatsApp</span>
            </a>
            
            <a href="#portfolio" class="btn-secondary">
              <span>Ver Nossos Projetos</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>

          <!-- Destaques Rápidos e Compactos -->
          <div class="hero-trust-row">
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </span>
              <div class="trust-text">
                <strong>Entrega Ágil</strong>
                <span>Poucos dias</span>
              </div>
            </div>
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </span>
              <div class="trust-text">
                <strong>100% Mobile</strong>
                <span>Celular e PC</span>
              </div>
            </div>
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              </span>
              <div class="trust-text">
                <strong>A partir de R$ 497</strong>
                <span>Em 2x sem juros</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Hero (Celular) -->
        <div class="hero-visual">
          <div class="phone-frame-container">
            <div class="floating-bubble bubble-google">
              <span class="google-logo">G</span>
              <div>
                <strong>Presença no Google</strong>
                <small>Destaque na sua região</small>
              </div>
            </div>

            <div class="phone-mockup-main">
              <div class="phone-inner">
                <img src="assets/images/mockup-oficina-clinica.svg" alt="Modelo Profissional" class="phone-mockup-img" id="heroPreviewImg">
              </div>
            </div>

            <div class="floating-bubble bubble-whatsapp">
              <span class="wa-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#16A34A"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/></svg>
              </span>
              <div>
                <strong>Direto pro WhatsApp</strong>
                <small>Mais agilidade e vendas</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 2. O PORTFÓLIO (A VITRINE) ================= -->`;

html = html.replace(heroRegex, newHeroHtml);

// ==============================================================================
// 2. PORTFOLIO SECTION: BANNER 3D DESKTOP-ONLY + CARDS ACADEMIA & DOCERIA MOBILE-ONLY
// ==============================================================================
// Replace the portfolio section content
const portfolioStart = html.indexOf('<section class="section portfolio-section" id="portfolio">');
const portfolioEnd = html.indexOf('</section>', portfolioStart) + '</section>'.length;

const newPortfolioHtml = `<section class="section portfolio-section" id="portfolio">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Vitrine de Projetos</span>
          <h2 class="section-title">Nossos Projetos</h2>
          <p class="section-description">
            Modelos de alta conversão para empresas e comércios locais.
          </p>
        </div>

        <!-- Botão Destaque: Galeria 3D (VISÍVEL APENAS NO COMPUTADOR / DESKTOP) -->
        <div class="portfolio-mathias-banner desktop-only-feature">
          <button type="button" class="btn-mathias-open js-open-mathias-gallery" id="btnOpenMathiasGallery" aria-label="Abrir galeria interativa 3D de projetos">
            <div class="mathias-btn-glow"></div>
            <div class="mathias-btn-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div class="mathias-btn-content">
              <span class="mathias-btn-badge">EXPERIÊNCIA 3D</span>
              <span class="mathias-btn-title">Ver Nossos Projetos</span>
              <span class="mathias-btn-sub">Galeria curva interativa com 7 modelos reais</span>
            </div>
            <div class="mathias-btn-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        </div>

        <!-- Vitrine de Esferas 3D Flutuantes (Direcionam para Preço, Como Funciona e Contato) -->
        <div class="orbs-showcase" aria-label="Vitrine de Esferas Interativas">
          <!-- Bola 1: Área de Preço (Azul Claro) -->
          <a href="#preco" class="orb-item js-trigger-preco" title="Abrir Área de Preço e Planos">
            <div class="orb-sphere orb-sphere-azul-claro">
              <div class="orb-glass-gloss"></div>
            </div>
            <span class="orb-label">Área de Preço</span>
          </a>

          <!-- Bola 2: Como Funciona (Azul Violeta) -->
          <a href="#como-funciona" class="orb-item js-trigger-como-funciona" title="Abrir Passo a Passo de Como Funciona">
            <div class="orb-sphere orb-sphere-azul-violeta orb-sphere-featured">
              <div class="orb-glass-gloss"></div>
            </div>
            <span class="orb-label">Como Funciona</span>
          </a>

          <!-- Bola 3: Contato (Violeta) -->
          <a href="#contato" class="orb-item js-trigger-contato" title="Ir para Contato e WhatsApp">
            <div class="orb-sphere orb-sphere-violeta">
              <div class="orb-glass-gloss"></div>
            </div>
            <span class="orb-label">Contato</span>
          </a>
        </div>

        <!-- ÁREA DE CARDS VISÍVEL APENAS NO CELULAR (MOBILE-ONLY SHOWCASE) -->
        <!-- Substituído Glacy pela Academia VoltFit conforme solicitado -->
        <div class="mobile-only-showcase">
          <div class="portfolio-grid">
            
            <!-- Modelo 01: Plano Essencial (Academia VoltFit) -->
            <article class="portfolio-card" id="modelo-essencial">
              <div class="portfolio-mockup-wrapper">
                <div class="card-orb-badge badge-essencial">
                  <div class="mini-sphere sphere-blue"></div>
                  <span>Plano Essencial</span>
                </div>
                <div class="phone-device-frame">
                  <img src="assets/images/mockup-academia.png" alt="Site Academia VoltFit - Exemplo Plano Essencial" class="phone-device-screen">
                </div>
                <button class="btn-preview-zoom js-zoom-trigger" data-target="assets/images/mockup-academia.png" data-title="Academia VoltFit (Exemplo do Plano Essencial)" aria-label="Ampliar Modelo Academia VoltFit">
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
                <div class="portfolio-plan-pill plan-pill-essencial">
                  <span class="plan-pill-title">Plano Essencial</span>
                  <span class="plan-pill-price">Setup R$ 497 (ou 2x R$ 248,50) • R$ 47/mês</span>
                </div>
                <div class="portfolio-niche">Academia, Musculação &amp; Fitness</div>
                <h3 class="portfolio-item-title">Academia VoltFit</h3>
                <p class="portfolio-item-focus">
                  <strong>Modelo do Plano Essencial:</strong> Estrutura moderna, rápida e focada em apresentar planos, modalidades e converter matrículas direto no WhatsApp.
                </p>
                <div class="portfolio-features">
                  <span>✓ Site One-Page de Alta Conversão</span>
                  <span>✓ Botão Direto para o WhatsApp</span>
                  <span>✓ Grade de Aulas &amp; Modalidades</span>
                  <span>✓ Hospedagem 24h &amp; SSL Seguro</span>
                  <span>✓ Suporte para Pequenos Ajustes</span>
                </div>
                <a href="https://academiarida-ashen.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>

            <!-- Modelo 02: Plano Personalizado (Doceria Gourmet Doralice) -->
            <article class="portfolio-card featured-project" id="modelo-personalizado">
              <div class="portfolio-mockup-wrapper">
                <div class="card-orb-badge badge-destaque">
                  <div class="mini-sphere sphere-gold"></div>
                  <span>Plano Personalizado • Destaque</span>
                </div>
                <div class="phone-device-frame">
                  <img src="assets/images/mockup-doceria.png" alt="Site Doceria Gourmet Doralice - Exemplo Plano Personalizado" class="phone-device-screen">
                </div>
                <button class="btn-preview-zoom js-zoom-trigger" data-target="assets/images/mockup-doceria.png" data-title="Doceria Gourmet Doralice (Exemplo do Plano Personalizado)" aria-label="Ampliar Modelo Doceria Doralice">
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
                  <span class="plan-pill-price">Setup R$ 697 (ou 2x R$ 348,50) • R$ 67/mês</span>
                </div>
                <div class="portfolio-niche">Confeitaria Artesanal &amp; Doceria Gourmet</div>
                <h3 class="portfolio-item-title">Doceria Gourmet Doralice</h3>
                <p class="portfolio-item-focus">
                  <strong>Modelo do Plano Personalizado:</strong> Projeto sob medida com design exclusivo, galeria imersiva de produtos com fotos em alta definição, catálogo de encomendas e <strong>tudo do Plano Essencial e muito mais</strong>.
                </p>
                <div class="portfolio-features">
                  <span>✓ Tudo Incluso no Plano Essencial</span>
                  <span>✓ Design Exclusivo Sob Medida</span>
                  <span>✓ Galeria Interativa com Fotos em HD</span>
                  <span>✓ Catálogo Completo de Encomendas</span>
                  <span>✓ Otimização de SEO Local Google</span>
                </div>
                <a href="https://doceriarida.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-view-live">
                  <span>Visitar Site ao Vivo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>

          </div>

          <!-- Nota abaixo das imagens no celular -->
          <div class="portfolio-note-box">
            <div class="note-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div class="note-content">
              <p class="note-quote">
                "Seu negócio é de outro ramo? Sem problemas! Nós personalizamos 100% para a sua marca."
              </p>
              <div class="niche-tags">
                <span>Petshops</span>
                <span>Academias</span>
                <span>Padarias</span>
                <span>Salões de Beleza</span>
                <span>Clínicas</span>
                <span>Comércios em Geral</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>`;

html = html.substring(0, portfolioStart) + newPortfolioHtml + html.substring(portfolioEnd);

// ==============================================================================
// 3. COLLAPSIBLE #preco E #como-funciona (SÓ VISÍVEIS AO CLICAR NAS ESFERAS)
// ==============================================================================
// Update #preco to have initial display: none and a close button
html = html.replace(
  '<section class="section pricing-section" id="preco">',
  '<section class="section pricing-section sphere-panel" id="preco" style="display: none;">\n        <div class="panel-header-close-bar text-right container"><button type="button" class="btn-hide-sphere-panel js-close-preco">✕ Fechar Área de Preço</button></div>'
);

// Add bottom close button to #preco before its closing </section>
const precoEndIdx = html.indexOf('</section>', html.indexOf('id="preco"'));
const precoCloseBottom = `
        <div class="panel-bottom-close-bar text-center">
          <button type="button" class="btn-hide-sphere-panel js-close-preco">▲ Ocultar Área de Preço</button>
        </div>
      `;
html = html.substring(0, precoEndIdx) + precoCloseBottom + html.substring(precoEndIdx);

// Update #como-funciona to have initial display: none and a close button
html = html.replace(
  '<section class="section process-section" id="como-funciona">',
  '<section class="section process-section sphere-panel" id="como-funciona" style="display: none;">\n        <div class="panel-header-close-bar text-right container"><button type="button" class="btn-hide-sphere-panel js-close-como-funciona">✕ Fechar Como Funciona</button></div>'
);

const comoFuncionaEndIdx = html.indexOf('</section>', html.indexOf('id="como-funciona"'));
const comoFuncionaCloseBottom = `
        <div class="panel-bottom-close-bar text-center">
          <button type="button" class="btn-hide-sphere-panel js-close-como-funciona">▲ Ocultar Como Funciona</button>
        </div>
      `;
html = html.substring(0, comoFuncionaEndIdx) + comoFuncionaCloseBottom + html.substring(comoFuncionaEndIdx);

// ==============================================================================
// 4. REMOVE ALL EMOJIS FROM #mais-informacoes
// ==============================================================================
html = html.replace(/<div class="extra-tab-icon">📌<\/div>/g, '<div class="extra-tab-icon-svg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>');
html = html.replace(/<div class="extra-tab-icon">📊<\/div>/g, '<div class="extra-tab-icon-svg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div>');
html = html.replace(/<div class="extra-tab-icon">❓<\/div>/g, '<div class="extra-tab-icon-svg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>');

html = html.replace(/📌 /g, '');
html = html.replace(/📊 /g, '');
html = html.replace(/❓ /g, '');
html = html.replace(/✦ /g, '');

// ==============================================================================
// 5. UPDATE 3D GALLERY MODAL HEADER WITH DROPDOWN (NO EMOJIS, CLOSES ON CLICK)
// ==============================================================================
const modalHeaderRegex = /<header class="mathias-header">[\s\S]*?<\/header>/;

const newModalHeader = `<header class="mathias-header">
      <div class="brand-group">
        <h2 class="mathias-brand-title">Rida • Vitrine de Projetos</h2>
        <p class="mathias-brand-sub">Modelos Reais • Experiência 3D</p>
      </div>

      <!-- Menu Dropdown de Categorias (Sem emojis, fecha automaticamente ao escolher) -->
      <div class="mathias-category-dropdown" id="mathiasCategoryDropdown">
        <button type="button" class="btn-category-trigger" id="btnCategoryTrigger" aria-expanded="false" aria-haspopup="true">
          <span class="trigger-label">Categoria:</span>
          <span class="trigger-current" id="currentCategoryText">Todos</span>
          <svg class="trigger-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="category-dropdown-list" id="categoryDropdownList" style="display: none;">
          <button type="button" class="category-select-item active" data-category="all">Todos (7 modelos)</button>
          <button type="button" class="category-select-item" data-category="petshop">Pet Shop</button>
          <button type="button" class="category-select-item" data-category="padaria">Padaria</button>
          <button type="button" class="category-select-item" data-category="academia">Academia</button>
          <button type="button" class="category-select-item" data-category="doceria">Doceria</button>
          <button type="button" class="category-select-item" data-category="salao">Salão de Beleza</button>
          <button type="button" class="category-select-item" data-category="jornalismo">Jornalismo</button>
          <button type="button" class="category-select-item" data-category="cafeteria">Cafeteria</button>
        </div>
      </div>

      <!-- Botão Fechar -->
      <button type="button" class="btn-close-gallery js-close-mathias-gallery" id="btnCloseMathiasGallery" aria-label="Fechar Galeria">
        <span>Fechar</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </header>`;

html = html.replace(modalHeaderRegex, newModalHeader);

// Save updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html!');

