const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. HERO SUBTITLE
const oldHeroSub = `<p class="hero-subtitle">
            Presença oficial no Google e estrutura completa para seu negócio vender mais.
          </p>`;
const newHeroSub = `<p class="hero-subtitle">
            Tenha um site profissional para apresentar seu negócio e facilitar o contato com novos clientes.
          </p>`;

if (html.includes(oldHeroSub)) {
  html = html.replace(oldHeroSub, newHeroSub);
  console.log('1. Hero subtitle updated.');
} else {
  console.log('1. Hero subtitle not found directly.');
}

// 1b. HERO TRUST ROW
const oldHeroTrust = `<div class="trust-item">
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
            </div>`;

const newHeroTrust = `<div class="trust-item">
              <span class="trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </span>
              <div class="trust-text">
                <strong>Prazo Ágil</strong>
                <span>Até 5 dias úteis*</span>
              </div>
            </div>
            <div class="trust-item">
              <span class="trust-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </span>
              <div class="trust-text">
                <strong>Pensado p/ Celular</strong>
                <span>100% responsivo</span>
              </div>
            </div>`;

if (html.includes(oldHeroTrust)) {
  html = html.replace(oldHeroTrust, newHeroTrust);
  console.log('1b. Hero trust row updated.');
} else {
  console.log('1b. Hero trust row not found directly.');
}

// 1c. HERO FLOATING BUBBLE
const oldHeroBubble = `<div class="floating-bubble bubble-google">
              <span class="google-logo">G</span>
              <div>
                <strong>Google</strong>
                <small>Destaque na sua cidade</small>
              </div>
            </div>`;
const newHeroBubble = `<div class="floating-bubble bubble-google">
              <span class="google-logo">G</span>
              <div>
                <strong>Presença Digital</strong>
                <small>Sua empresa na internet</small>
              </div>
            </div>`;
if (html.includes(oldHeroBubble)) {
  html = html.replace(oldHeroBubble, newHeroBubble);
  console.log('1c. Hero floating bubble updated.');
}

// 2. COMO FUNCIONA - PASSO 3 AND BANNER
const oldStep3 = `<!-- Passo 3 -->
          <div class="step-card">
            <div class="step-badge">3</div>
            <div class="step-icon-header">
              <span class="step-label-top">Passo 3</span>
            </div>
            <h3 class="step-title">Entrega Rápida</h3>
            <p class="step-text">
              Em poucos dias, apresentamos o seu site pronto, testado e funcionando.
            </p>
            <div class="step-footer">
              <span>Você aprova, paga a 2ª parte e começa a divulgar</span>
            </div>
          </div>`;

const newStep3 = `<!-- Passo 3 -->
          <div class="step-card">
            <div class="step-badge">3</div>
            <div class="step-icon-header">
              <span class="step-label-top">Passo 3</span>
            </div>
            <h3 class="step-title">Entrega Rápida</h3>
            <p class="step-text">
              Até 5 dias úteis após o recebimento de todas as informações e materiais necessários. Apresentamos seu site pronto, testado e funcionando.
            </p>
            <div class="step-footer">
              <span>Você aprova, quita a 2ª parte do setup e coloca no ar</span>
            </div>
          </div>`;

if (html.includes(oldStep3)) {
  html = html.replace(oldStep3, newStep3);
  console.log('2. Step 3 in Como Funciona updated.');
}

const oldStepBanner = `<div class="process-cta-banner">
          <div class="cta-banner-content">
            <h3>Pronto para transformar seu negócio em uma referência local?</h3>
            <p>Garanta a sua vaga de produção desta semana diretamente pelo WhatsApp.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Quero%20dar%20o%20Passo%201%20e%20fazer%20o%20alinhamento%20do%20meu%20site." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
            <span>Iniciar Passo 1 no WhatsApp</span>
          </a>
        </div>`;

const newStepBanner = `<div class="process-cta-banner">
          <div class="cta-banner-content">
            <h3>Pronto para profissionalizar a presença digital da sua empresa?</h3>
            <p>Fale conosco pelo WhatsApp para iniciar o alinhamento do seu projeto.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Quero%20dar%20o%20Passo%201%20e%20fazer%20o%20alinhamento%20do%20meu%20site." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
            <span>Iniciar Passo 1 no WhatsApp</span>
          </a>
        </div>`;

if (html.includes(oldStepBanner)) {
  html = html.replace(oldStepBanner, newStepBanner);
  console.log('2b. Step banner in Como Funciona updated.');
}

// 3. PREÇOS SECTION
const precoStartTag = '<section class="section pricing-section sphere-panel" id="preco"';
const precoEndTag = '</section>';
const pStart = html.indexOf(precoStartTag);
const pEnd = html.indexOf(precoEndTag, pStart);

const newPrecoSection = `<section class="section pricing-section sphere-panel" id="preco" style="display: none;">
        <div class="panel-header-close-bar text-right container"><button type="button" class="btn-hide-sphere-panel js-close-preco">✕ Fechar Área de Preço</button></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Transparência Total</span>
          <h2 class="section-title">Investimento claro e sem taxas escondidas</h2>
          <p class="section-description">
            Escolha o plano ideal para as necessidades e o momento atual da sua empresa:
          </p>
        </div>

        <!-- Cards de Preços (Grid de Planos) -->
        <div class="pricing-plans-grid">
          
          <!-- Plano 01: Plano Essencial -->
          <div class="pricing-card">
            <div class="pricing-badge-popular">Plano Essencial</div>
            
            <div class="plan-header text-center">
              <h3 class="plan-title">Plano Essencial</h3>
              <div class="plan-target-audience">
                <strong>Indicação:</strong> Pequenos negócios que precisam de uma presença profissional na internet, com um site de página única (One Page), apresentação da empresa, serviços, localização e contato.
              </div>
            </div>

            <div class="pricing-grid">
              <!-- Setup Box -->
              <div class="price-block setup-block">
                <span class="price-label">Criação do Site (Setup)</span>
                <div class="price-value">
                  <span class="currency">R$</span>
                  <span class="amount">497</span>
                  <span class="cents">,00</span>
                </div>
                <div class="payment-badge">Condição Facilitada</div>
                <span class="payment-terms">
                  Pago em 2x: <strong>50% para iniciar (R$ 248,50)</strong> e <strong>50% na entrega (R$ 248,50)</strong> com tudo aprovado por você.
                </span>
              </div>

              <!-- Plus Separator -->
              <div class="pricing-divider">
                <span>+</span>
              </div>

              <!-- Monthly Box -->
              <div class="price-block monthly-block">
                <span class="price-label">Manutenção Mensal</span>
                <div class="price-value">
                  <span class="currency">R$</span>
                  <span class="amount">47</span>
                  <span class="cents">,00</span>
                  <span class="period">/ mês</span>
                </div>
                <span class="monthly-includes">
                  Hospedagem rápida, certificado SSL e suporte técnico contínuo.
                </span>
              </div>
            </div>

            <!-- Features Included -->
            <div class="pricing-includes">
              <div class="text-center" style="margin-bottom: 12px;">
                <span class="includes-plus-badge">Recursos Inclusos no Plano</span>
                <h4 class="includes-title" style="margin-bottom: 0;">O que está incluso:</h4>
              </div>
              <ul class="includes-list">
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Site de página única (One Page)</strong>
                    <span>Estrutura moderna, ágil e direta ao ponto para conversão de contatos.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Apresentação da empresa e serviços</strong>
                    <span>Informações claras dos seus serviços, horários e proposta do negócio.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Localização e mapa integrado</strong>
                    <span>Facilidade para clientes encontrarem o seu comércio físico.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Botão direto para WhatsApp</strong>
                    <span>Canal de contato imediato posicionado de forma estratégica.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Hospedagem, certificado SSL e suporte</strong>
                    <span>Estabilidade em servidores rápidos e suporte técnico via WhatsApp.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Prazo de entrega ágil</strong>
                    <span>Até 5 dias úteis após o recebimento de todas as informações necessárias.</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Botão de Ação -->
            <div class="pricing-action text-center">
              <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20fechar%20o%20Plano%20Essencial%20da%20Rida%20(Setup%20R$%20497%20+%20R$%2047/m%C3%AAs)." data-text="Olá! Gostaria de fechar o Plano Essencial da Rida (Setup R$ 497 + R$ 47/mês)." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
                <span class="whatsapp-icon-circle">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
                  </svg>
                </span>
                <span>Escolher Plano Essencial</span>
              </a>
              <span class="guarantee-text">Sem fidelidade obrigatória • Transparência de verdade</span>
            </div>
          </div>

          <!-- Plano 02: Plano Personalizado -->
          <div class="pricing-card featured-pricing-card">
            <div class="pricing-badge-popular">Destaque • Mais Completo</div>
            
            <div class="plan-header text-center">
              <h3 class="plan-title">Plano Personalizado</h3>
              <div class="plan-target-audience">
                <strong>Indicação:</strong> Empresas que precisam de uma apresentação mais completa, com múltiplas seções, catálogo ou portfólio organizado e estrutura visual mais personalizada.
              </div>
            </div>

            <div class="pricing-grid">
              <!-- Setup Box -->
              <div class="price-block setup-block">
                <span class="price-label">Criação do Site (Setup)</span>
                <div class="price-value">
                  <span class="currency">R$</span>
                  <span class="amount">797</span>
                  <span class="cents">,00</span>
                </div>
                <div class="payment-badge">Condição Facilitada</div>
                <span class="payment-terms">
                  Pago em 2x: <strong>50% para iniciar (R$ 398,50)</strong> e <strong>50% na entrega (R$ 398,50)</strong> com tudo aprovado por você.
                </span>
              </div>

              <!-- Plus Separator -->
              <div class="pricing-divider">
                <span>+</span>
              </div>

              <!-- Monthly Box -->
              <div class="price-block monthly-block">
                <span class="price-label">Manutenção Mensal</span>
                <div class="price-value">
                  <span class="currency">R$</span>
                  <span class="amount">77</span>
                  <span class="cents">,00</span>
                  <span class="period">/ mês</span>
                </div>
                <span class="monthly-includes">
                  Hospedagem de alta performance, certificado SSL e atualizações prioritárias.
                </span>
              </div>
            </div>

            <!-- Features Included -->
            <div class="pricing-includes">
              <div class="text-center" style="margin-bottom: 12px;">
                <span class="includes-plus-badge">Recursos Inclusos no Plano</span>
                <h4 class="includes-title" style="margin-bottom: 0;">O que está incluso:</h4>
              </div>
              <ul class="includes-list">
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Site com múltiplas seções</strong>
                    <span>Estrutura completa com páginas e áreas dedicadas para a sua empresa.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Estrutura visual mais personalizada</strong>
                    <span>Visual sob medida para o seu público, com identidade alinhada à sua marca.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Catálogo ou portfólio organizado</strong>
                    <span>Apresentação elegante de produtos, fotos de serviços, pratos ou projetos.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Apresentação detalhada dos serviços</strong>
                    <span>Explicação aprofundada de tudo o que sua empresa oferece com destaque.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Integração com WhatsApp e Google Maps</strong>
                    <span>Localização interativa e pontos estratégicos para contato direto.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Hospedagem, suporte e atualizações prioritárias</strong>
                    <span>Atendimento prioritário para mudanças e servidores de alta performance.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Prazo de entrega ágil</strong>
                    <span>Até 5 dias úteis após o recebimento de todas as informações necessárias.</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Botão de Ação -->
            <div class="pricing-action text-center">
              <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20fechar%20o%20Plano%20Personalizado%20da%20Rida%20(Setup%20R$%20797%20+%20R$%2077/m%C3%AAs)." data-text="Olá! Gostaria de fechar o Plano Personalizado da Rida (Setup R$ 797 + R$ 77/mês)." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
                <span class="whatsapp-icon-circle">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
                  </svg>
                </span>
                <span>Escolher Plano Personalizado</span>
              </a>
              <span class="guarantee-text">Sem fidelidade obrigatória • Suporte prioritário</span>
            </div>
          </div>

        </div>

        <!-- Banner de Orientação no Final da Seção de Preços -->
        <div class="pricing-consult-box text-center">
          <div class="consult-box-content">
            <h4 class="consult-box-title">Dúvidas sobre qual plano escolher?</h4>
            <p class="consult-box-desc">Converse com nossa equipe para entender qual formato atende melhor a sua empresa.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20para%20escolher%20o%20melhor%20plano%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-md js-whatsapp-link">
            <span>Falar com Nossa Equipe</span>
          </a>
        </div>

      </div>
    
        <div class="panel-bottom-close-bar text-center">
          <button type="button" class="btn-hide-sphere-panel js-close-preco">▲ Ocultar Área de Preço</button>
        </div>
      </section>`;

if (pStart !== -1 && pEnd !== -1) {
  html = html.substring(0, pStart) + newPrecoSection + html.substring(pEnd + precoEndTag.length);
  console.log('3. Preço section updated.');
} else {
  console.log('3. Preço section bounds not found.');
}

// 4. HUB DE MAIS INFORMAÇÕES
const hubStartTag = '<section class="section extra-hub-section" id="mais-informacoes">';
const hubEndTag = '</section>';
const hStart = html.indexOf(hubStartTag);
const hEnd = html.indexOf(hubEndTag, hStart);

const newHubSection = `<section class="section extra-hub-section" id="mais-informacoes">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">Deseja saber mais antes de contratar?</h2>
          <p class="section-description">
            Clique no assunto de seu interesse para ver todos os detalhes e diferenciais da nossa agência:
          </p>
        </div>

        <div class="extra-tabs-grid">
          <!-- Card 1: Diferenciais -->
          <button class="btn-extra-tab" data-target="promessa">
            <div class="tab-category">DIFERENCIAIS</div>
            <div class="tab-main">
              <div class="tab-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div class="tab-info">
                <h4>Por Que Nos Escolher?</h4>
                <p>Soluções digitais para facilitar o contato com seus clientes e suporte contínuo</p>
              </div>
            </div>
            <span class="tab-arrow">Ver diferenciais ↓</span>
          </button>

          <!-- Card 2: Presença Digital -->
          <button class="btn-extra-tab" data-target="problema">
            <div class="tab-category">PRESENÇA DIGITAL</div>
            <div class="tab-main">
              <div class="tab-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <div class="tab-info">
                <h4>Presença Digital Completa</h4>
                <p>O papel das redes sociais e do site próprio reunindo tudo em um só lugar</p>
              </div>
            </div>
            <span class="tab-arrow">Ver comparativo ↓</span>
          </button>

          <!-- Card 3: Tire Dúvidas -->
          <button class="btn-extra-tab" data-target="faq">
            <div class="tab-category">TIRE DÚVIDAS</div>
            <div class="tab-main">
              <div class="tab-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="tab-info">
                <h4>Dúvidas Frequentes (FAQ)</h4>
                <p>Prazos de entrega, forma de pagamento, manutenção mensal e suporte técnico</p>
              </div>
            </div>
            <span class="tab-arrow">Ver perguntas ↓</span>
          </button>
        </div>
      </div>
    </section>`;

if (hStart !== -1 && hEnd !== -1) {
  html = html.substring(0, hStart) + newHubSection + html.substring(hEnd + hubEndTag.length);
  console.log('4. Hub de Mais Informações updated.');
}

// 5. PROMESSA (DIFERENCIAIS)
const promessaStartTag = '<section class="section benefits-section" id="promessa">';
const promessaEndTag = '</section>';
const prStart = html.indexOf(promessaStartTag);
const prEnd = html.indexOf(promessaEndTag, prStart);

const newPromessaSection = `<section class="section benefits-section" id="promessa">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Nossos Diferenciais</span>
          <h2 class="section-title">Por que escolher a Rida?</h2>
          <p class="section-description">
            Soluções digitais pensadas para facilitar o contato com seus clientes, com comunicação clara e suporte técnico contínuo.
          </p>
        </div>

        <!-- Tópicos de Benefícios -->
        <div class="benefits-grid">
          
          <!-- Tópico 1: Celular -->
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </div>
            <div class="benefit-tag">Design Responsivo</div>
            <h3 class="benefit-title">Pensado Primeiro para o Celular</h3>
            <p class="benefit-text">
              Desenvolvemos páginas leves e adaptáveis a qualquer tela, garantindo navegação rápida e confortável para quem acessa pelo celular.
            </p>
            <div class="benefit-detail">
              <span>Layout adaptável para qualquer dispositivo móvel</span>
            </div>
          </div>

          <!-- Tópico 2: Contato Facilitado -->
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div class="benefit-tag">Contato Facilitado</div>
            <h3 class="benefit-title">Navegação Direta e Intuitiva</h3>
            <p class="benefit-text">
              Estrutura organizada para que o visitante encontre rapidamente o que procura e acesse seu WhatsApp ou canais de atendimento em um clique.
            </p>
            <div class="benefit-detail">
              <span>Informações claras e contato facilitado com sua empresa</span>
            </div>
          </div>

          <!-- Tópico 3: Suporte Técnico -->
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="benefit-tag">Acompanhamento Técnico</div>
            <h3 class="benefit-title">Suporte Técnico Contínuo</h3>
            <p class="benefit-text">
              Cuidamos da hospedagem, estabilidade e atualizações do seu site. Sempre que precisar alterar informações ou fotos, nossa equipe realiza os ajustes.
            </p>
            <div class="benefit-detail">
              <span>Manutenção técnica e atendimento direto via WhatsApp</span>
            </div>
          </div>

        </div>
      </div>
    </section>`;

if (prStart !== -1 && prEnd !== -1) {
  html = html.substring(0, prStart) + newPromessaSection + html.substring(prEnd + promessaEndTag.length);
  console.log('5. Promessa section updated.');
}

// 6. PROBLEMA (PRESENÇA DIGITAL)
const problemaStartTag = '<section class="section problem-section" id="problema">';
const problemaEndTag = '</section>';
const probStart = html.indexOf(problemaStartTag);
const probEnd = html.indexOf(problemaEndTag, probStart);

const newProblemaSection = `<section class="section problem-section" id="problema">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Presença Digital</span>
          <h2 class="section-title">O papel das redes sociais e do site próprio</h2>
          <p class="section-description">
            Instagram e outras redes sociais são ótimas ferramentas para divulgar seu negócio. Mas ter um site próprio permite reunir suas informações, serviços, localização e formas de contato em um único lugar, oferecendo mais praticidade para seus clientes.
          </p>
        </div>

        <!-- Comparativo Positivo e Complementar -->
        <div class="comparison-grid">
          <!-- Card 1: Redes Sociais -->
          <div class="compare-card">
            <div class="compare-header">
              <div class="compare-badge badge-danger">Divulgação & Relacionamento</div>
              <h3>Instagram e Redes Sociais</h3>
            </div>
            <ul class="compare-list">
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Atração de público e novidades diárias</strong>
                  <p>Excelente ferramenta para atrair novos seguidores e publicar os bastidores e novidades do seu dia a dia.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Comunicação ágil com seguidores</strong>
                  <p>Interações rápidas por meio de postagens visuais, stories e mensagens diretas.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-cross">✕</span>
                <div>
                  <strong>Informações dispersas no feed</strong>
                  <p>Detalhes importantes como horários, catálogo e localização tendem a ficar espalhados em publicações antigas.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-cross">✕</span>
                <div>
                  <strong>Canal complementar ao endereço oficial</strong>
                  <p>Funciona de maneira muito mais eficiente quando direciona o cliente para uma página oficial completa.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Card 2: Site Próprio -->
          <div class="compare-card">
            <div class="compare-header">
              <div class="compare-badge badge-success">Ponto Central Oficial</div>
              <h3>Site Próprio da Empresa</h3>
            </div>
            <ul class="compare-list">
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Todas as informações em um único lugar</strong>
                  <p>Serviços, localização, fotos e horários organizados de forma clara e permanente para o cliente encontrar.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Botão direto para o seu WhatsApp</strong>
                  <p>O visitante acessa a página e, com apenas um clique, já inicia uma conversa direta com você no WhatsApp.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Credibilidade e segurança profissional</strong>
                  <p>Transmite solidez para clientes que pesquisam referências da sua empresa antes de contratar.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Disponível 24 horas por dia</strong>
                  <p>Um canal oficial sempre ativo para apresentar seu negócio com clareza a qualquer momento.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Chamada de transição positiva -->
        <div class="problem-footer-cta text-center">
          <p>Reúna todas as informações que seus clientes precisam em um canal oficial, rápido e organizado.</p>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20reunir%20as%20informa%C3%A7%C3%B5es%20da%20minha%20empresa%20em%20um%20site%20pr%C3%B3prio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-md js-whatsapp-link">
            <span>Criar o site da minha empresa</span>
          </a>
        </div>
      </div>
    </section>`;

if (probStart !== -1 && probEnd !== -1) {
  html = html.substring(0, probStart) + newProblemaSection + html.substring(probEnd + problemaEndTag.length);
  console.log('6. Problema section updated.');
}

// 7. FAQ SECTION
const faqStartTag = '<section class="section faq-section" id="faq">';
const faqEndTag = '</section>';
const fStart = html.indexOf(faqStartTag);
const fEnd = html.indexOf(faqEndTag, fStart);

const newFaqSection = `<section class="section faq-section" id="faq">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Tire Suas Dúvidas</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-description">Informações claras e objetivas sobre a contratação e manutenção do seu site.</p>
        </div>

        <div class="faq-accordion-list">
          <!-- FAQ Item 1: O que inclui a manutenção -->
          <details class="faq-item" open>
            <summary class="faq-question">
              <span>O que está incluído no serviço de manutenção mensal?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>A manutenção mensal garante que o seu site permaneça seguro, rápido e sempre disponível na internet. O serviço inclui:</p>
              <ul style="margin: 8px 0 10px 18px; line-height: 1.6;">
                <li><strong>Hospedagem em servidores rápidos:</strong> seu site no ar com alto desempenho e estabilidade contínua.</li>
                <li><strong>Certificado de Segurança (SSL):</strong> cadeado de segurança verde no navegador, garantindo proteção aos visitantes.</li>
                <li><strong>Suporte técnico via WhatsApp:</strong> canal direto com nossa equipe para tirar dúvidas e resolver questões técnicas.</li>
                <li><strong>Atualizações e ajustes:</strong> alterações periódicas de textos, fotos, contatos, cardápios ou preços (com prioridade no Plano Personalizado).</li>
              </ul>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-top: 6px;">
                <em>Sobre o domínio:</em> O registro do domínio próprio (ex: suaempresa.com.br) é feito diretamente pelo cliente em órgãos oficiais como o Registro.br (cerca de R$ 40/ano) e nossa equipe realiza toda a configuração técnica sem nenhum custo extra. Caso prefira, também disponibilizamos um subdomínio profissional incluso sem custo adicional.
              </p>
            </div>
          </details>

          <!-- FAQ Item 2: Prazo de Entrega -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>Qual é o prazo de entrega do meu site?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Até 5 dias úteis após o recebimento de todas as informações e materiais necessários (como fotos, logotipo e informações básicas do negócio).</p>
            </div>
          </details>

          <!-- FAQ Item 3: Pagamento Setup -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>Como funciona a forma de pagamento do Setup?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>O pagamento do setup de criação é dividido em 2 vezes: 50% para iniciarmos o projeto (R$ 248,50 no Plano Essencial ou R$ 398,50 no Plano Personalizado) e os 50% restantes somente quando o site estiver pronto, revisado e aprovado por você.</p>
            </div>
          </details>

          <!-- FAQ Item 4: Alterações e atualizações -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>Quantas alterações de conteúdo estão incluídas no mês?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>No <strong>Plano Essencial</strong>, estão incluídas alterações periódicas de manutenção pontual (como atualização de telefones, horários de atendimento, endereço ou fotos específicas). No <strong>Plano Personalizado</strong>, você conta com atualizações prioritárias para novos produtos, serviços, fotos ou novidades no catálogo. Para grandes reestruturações ou páginas extras fora do escopo inicial, nossa equipe faz uma avaliação prévia em conjunto.</p>
            </div>
          </details>

          <!-- FAQ Item 5: Cancelamento da Manutenção -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>O que acontece se eu optar por cancelar a manutenção mensal?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Nossos planos não possuem fidelidade ou multas de cancelamento. Caso decida cancelar a manutenção mensal, a hospedagem em nossos servidores, o certificado SSL e o suporte técnico são encerrados ao término do período pago. O código-fonte e o conteúdo do site desenvolvido pertencem à sua empresa e podem ser exportados caso você queira hospedá-los por conta própria.</p>
            </div>
          </details>

          <!-- FAQ Item 6: Sem logotipo -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>E se eu ainda não tiver logotipo oficial ou material pronto?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Não há problema. Caso não tenha logotipo pronto, criamos uma assinatura tipográfica limpa e profissional com o nome da sua empresa para o cabeçalho do site sem custo adicional. Além disso, nós orientamos você sobre as fotos e informações essenciais para colocar a página no ar.</p>
            </div>
          </details>
        </div>
      </div>
    </section>`;

if (fStart !== -1 && fEnd !== -1) {
  html = html.substring(0, fStart) + newFaqSection + html.substring(fEnd + faqEndTag.length);
  console.log('7. FAQ section updated.');
}

// 8. CONTATO E FOOTER
const footerStartTag = '<footer class="site-footer" id="contato">';
const footerEndTag = '</footer>';
const ftStart = html.indexOf(footerStartTag);
const ftEnd = html.indexOf(footerEndTag, ftStart);

const newFooterSection = `<footer class="site-footer" id="contato">
    <div class="container">
      <div class="footer-grid">
        
        <!-- Coluna 1: Marca & Sobre -->
        <div class="footer-col">
          <div class="footer-brand">
            <div class="logo-box">
              <img src="assets/images/logo-rida.png" alt="Logo Rida" class="brand-logo-img">
            </div>
            <div>
              <span class="agency-title js-agency-name">Rida</span>
              <span class="agency-tagline">Sites Profissionais</span>
            </div>
          </div>
          <p class="footer-desc">
            Criação de sites modernos, rápidos e focados em facilitar o contato entre clientes e empresas.
          </p>
        </div>

        <!-- Coluna 2: Links Rápidos -->
        <div class="footer-col">
          <h4 class="footer-heading">Navegação</h4>
          <ul class="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#portfolio">Projetos</a></li>
            <li><a href="#preco">Preços</a></li>
            <li><a href="#como-funciona">Começando</a></li>
            <li><a href="#mais-informacoes">Informações</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Contato Direto -->
        <div class="footer-col">
          <h4 class="footer-heading">Fale Conosco</h4>
          <ul class="contact-list">
            <li>
              <span class="contact-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
                </svg>
              </span>
              <div class="contact-info">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="contact-type">WhatsApp</span>
                  <span class="badge-primary-contact">Comercial Principal</span>
                </div>
                <a href="https://wa.me/5512974070207" target="_blank" rel="noopener noreferrer" class="contact-link js-contact-whatsapp">
                  (12) 97407-0207
                </a>
              </div>
            </li>
            <li>
              <span class="contact-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
                </svg>
              </span>
              <div class="contact-info">
                <span class="contact-type">WhatsApp Suporte & Projetos</span>
                <a href="https://wa.me/5519999118817" target="_blank" rel="noopener noreferrer" class="contact-link js-contact-whatsapp2">
                  (19) 99911-8817
                </a>
              </div>
            </li>
            <li>
              <span class="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <div class="contact-info">
                <span class="contact-type">E-mail Comercial</span>
                <a href="mailto:rida.xv10@gmail.com" class="contact-link js-contact-email">
                  rida.xv10@gmail.com
                </a>
              </div>
            </li>
          </ul>

          <div class="footer-cta-box" style="margin-top: 14px;">
            <span class="cta-box-text">Quer iniciar o seu projeto hoje?</span>
            <a href="https://wa.me/5512974070207" target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-sm js-whatsapp-link">
              <span>Chamar no WhatsApp Comercial</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Copyright e Assinatura -->
      <div class="footer-bottom">
        <div class="footer-bottom-copy">
          <p>
            Desenvolvido por <strong class="js-agency-name">Rida</strong> © 2026 - Soluções digitais para empresas e comércios.
          </p>
          <p class="creators-note">
            Criado por <strong>Davi Xavier</strong> e <strong>Ricardo Veríssimo</strong>.
          </p>
        </div>
        <div class="footer-bottom-badges">
          <span class="pill-secure">Hospedagem Segura</span>
          <span class="pill-secure">Pensado para Celular</span>
        </div>
      </div>
    </div>
  </footer>`;

if (ftStart !== -1 && ftEnd !== -1) {
  html = html.substring(0, ftStart) + newFooterSection + html.substring(ftEnd + footerEndTag.length);
  console.log('8. Footer section updated.');
}

// 9. Bump cache query string for styles and script
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=9.0');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=9.0');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated with all comprehensive revisions!');
