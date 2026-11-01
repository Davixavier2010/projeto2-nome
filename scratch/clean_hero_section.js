const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const heroStart = html.indexOf('<section class="hero-section" id="inicio">');
const heroEnd = html.indexOf('</section>', heroStart) + '</section>'.length;

const ultraCleanHero = `<section class="hero-section" id="inicio">
      <div class="container hero-grid">
        <div class="hero-content">
          
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
            <span>Sites para Comércios e Empresas</span>
          </div>

          <!-- Título Ultrarresumido e Direto -->
          <h1 class="hero-title">
            Sites profissionais com <span class="highlight-title">clientes no WhatsApp</span>.
          </h1>

          <!-- Subtítulo de 1 linha -->
          <p class="hero-subtitle">
            Presença oficial no Google e estrutura completa para seu negócio vender mais.
          </p>

          <!-- Botões de Ação Imediata -->
          <div class="hero-actions">
            <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20um%20site%20profissional%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
              <span class="whatsapp-icon-circle">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
                </svg>
              </span>
              <span>Falar no WhatsApp</span>
            </a>
            
            <a href="#portfolio" class="btn-secondary">
              <span>Ver Projetos</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>

          <!-- Destaques Curtos -->
          <div class="hero-trust-row">
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </span>
              <div class="trust-text">
                <strong>Entrega Ágil</strong>
                <span>Poucos dias</span>
              </div>
            </div>
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </span>
              <div class="trust-text">
                <strong>100% Mobile</strong>
                <span>Celular e PC</span>
              </div>
            </div>
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
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
                <strong>Google</strong>
                <small>Destaque na sua cidade</small>
              </div>
            </div>

            <div class="phone-mockup-main">
              <div class="phone-inner">
                <img src="assets/images/mockup-oficina-clinica.svg" alt="Modelo Profissional" class="phone-mockup-img" id="heroPreviewImg">
              </div>
            </div>

            <div class="floating-bubble bubble-whatsapp">
              <span class="wa-badge">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#16A34A"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/></svg>
              </span>
              <div>
                <strong>WhatsApp</strong>
                <small>Contato e vendas imediatas</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

html = html.substring(0, heroStart) + ultraCleanHero + html.substring(heroEnd);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully replaced Hero with ultra-clean version!');

