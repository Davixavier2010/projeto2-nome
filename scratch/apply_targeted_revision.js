const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

function safeReplace(target, replacement, label) {
  if (!html.includes(target)) {
    console.error(`[ERROR] Target not found for: ${label}`);
    process.exit(1);
  }
  html = html.replace(target, replacement);
  console.log(`[OK] Replaced: ${label}`);
}

// ==========================================
// 1. PÁGINA INICIAL (HERO)
// ==========================================
safeReplace(
  `<p class="hero-subtitle">
            Presença oficial no Google e estrutura completa para seu negócio vender mais.
          </p>`,
  `<p class="hero-subtitle">
            Tenha um site profissional para apresentar seu negócio e facilitar o contato com novos clientes.
          </p>`,
  'Hero Subtitle'
);

safeReplace(
  `<div class="trust-item">
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
            </div>`,
  `<div class="trust-item">
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
            </div>`,
  'Hero Trust Items'
);

safeReplace(
  `<div class="floating-bubble bubble-google">
              <span class="google-logo">G</span>
              <div>
                <strong>Google</strong>
                <small>Destaque na sua cidade</small>
              </div>
            </div>`,
  `<div class="floating-bubble bubble-google">
              <span class="google-logo">G</span>
              <div>
                <strong>Presença Digital</strong>
                <small>Sua empresa na internet</small>
              </div>
            </div>`,
  'Hero Mockup Bubble'
);

// ==========================================
// 2. COMO FUNCIONA (PASSO A PASSO)
// ==========================================
safeReplace(
  `<!-- Passo 3 -->
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
          </div>`,
  `<!-- Passo 3 -->
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
          </div>`,
  'Como Funciona Step 3'
);

safeReplace(
  `<div class="process-cta-banner">
          <div class="cta-banner-content">
            <h3>Pronto para transformar seu negócio em uma referência local?</h3>
            <p>Garanta a sua vaga de produção desta semana diretamente pelo WhatsApp.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Quero%20dar%20o%20Passo%201%20e%20fazer%20o%20alinhamento%20do%20meu%20site." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
            <span>Iniciar Passo 1 no WhatsApp</span>
          </a>
        </div>`,
  `<div class="process-cta-banner">
          <div class="cta-banner-content">
            <h3>Pronto para profissionalizar a presença digital da sua empresa?</h3>
            <p>Fale conosco pelo WhatsApp para iniciar o alinhamento do seu projeto.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Quero%20dar%20o%20Passo%201%20e%20fazer%20o%20alinhamento%20do%20meu%20site." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
            <span>Iniciar Passo 1 no WhatsApp</span>
          </a>
        </div>`,
  'Como Funciona Banner'
);

// ==========================================
// 3. SEÇÃO DE PREÇOS (#preco)
// ==========================================
safeReplace(
  `<h2 class="section-title">Um investimento que cabe no bolso do seu negócio.</h2>
          <p class="section-description">
            Sem orçamentos surpresa ou taxas escondidas. Escolha o formato ideal para o momento da sua empresa:
          </p>`,
  `<h2 class="section-title">Investimento claro e sem taxas escondidas</h2>
          <p class="section-description">
            Escolha o plano ideal para as necessidades e o momento atual da sua empresa:
          </p>`,
  'Preços Header'
);

// Card Essencial
safeReplace(
  `<p class="plan-desc">Para negócios que precisam de uma presença profissional na internet.</p>`,
  `<div class="plan-target-audience">
                <strong>Indicação:</strong> Pequenos negócios que precisam de uma presença profissional na internet, com um site de página única (One Page), apresentação da empresa, serviços, localização e contato.
              </div>`,
  'Preços Essencial Target Audience'
);

safeReplace(
  `<span class="monthly-includes">
                  Hospedagem segura e suporte para seu comércio nunca parar.
                </span>`,
  `<span class="monthly-includes">
                  Hospedagem rápida, certificado SSL e suporte técnico contínuo.
                </span>`,
  'Preços Essencial Monthly Text'
);

safeReplace(
  `<ul class="includes-list">
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Site de página única (One Page)</strong>
                    <span>Estrutura moderna, rápida e direta ao ponto para conversão.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Apresentação da empresa e serviços</strong>
                    <span>Seus diferenciais organizados com clareza para seus clientes.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Botão direto para WhatsApp</strong>
                    <span>O cliente clica e já cai no seu atendimento sem barreiras.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Localização e mapa integrado</strong>
                    <span>Facilidade para clientes encontrarem seu comércio físico.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Hospedagem rápida e suporte via WhatsApp</strong>
                    <span>Tudo configurado para você não se preocupar com nada técnico.</span>
                  </div>
                </li>
              </ul>`,
  `<ul class="includes-list">
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
              </ul>`,
  'Preços Essencial Includes List'
);

safeReplace(
  `<span class="guarantee-text">Sem fidelidade amarrada • Suporte sem estresse</span>`,
  `<span class="guarantee-text">Sem fidelidade obrigatória • Transparência de verdade</span>`,
  'Preços Essencial Guarantee'
);

// Card Personalizado
safeReplace(
  `<p class="plan-desc">Para empresas que precisam de uma apresentação mais completa.</p>`,
  `<div class="plan-target-audience">
                <strong>Indicação:</strong> Empresas que precisam de uma apresentação mais completa, com múltiplas seções, catálogo ou portfólio organizado e estrutura visual mais personalizada.
              </div>`,
  'Preços Personalizado Target Audience'
);

safeReplace(
  `<span class="monthly-includes">
                  Hospedagem de alta velocidade e atualizações prioritárias.
                </span>`,
  `<span class="monthly-includes">
                  Hospedagem de alta performance, certificado SSL e atualizações prioritárias.
                </span>`,
  'Preços Personalizado Monthly Text'
);

safeReplace(
  `<ul class="includes-list">
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Site com múltiplas seções</strong>
                    <span>Estrutura completa com páginas e áreas dedicadas para sua marca.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Design mais personalizado</strong>
                    <span>Visual sob medida para o seu público, com identidade exclusiva.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Catálogo ou portfólio organizado</strong>
                    <span>Apresentação elegante de produtos, pratos, fotos ou trabalhos.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Apresentação detalhada dos serviços</strong>
                    <span>Explicação clara de tudo o que sua empresa oferece com destaque.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Integração com WhatsApp e Google Maps</strong>
                    <span>Localização interativa e chamadas estratégicas para o WhatsApp.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Hospedagem, suporte e atualizações prioritárias</strong>
                    <span>Atendimento ágil com prioridade e servidores ultra-rápidos.</span>
                  </div>
                </li>
              </ul>`,
  `<ul class="includes-list">
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Site com múltiplas seções</strong>
                    <span>Estrutura completa com áreas dedicadas para apresentar a marca em profundidade.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Estrutura visual mais personalizada</strong>
                    <span>Design sob medida alinhado à identidade e posicionamento da empresa.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Catálogo ou portfólio organizado</strong>
                    <span>Apresentação elegante de produtos, itens de cardápio, projetos ou fotos.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Apresentação detalhada dos serviços</strong>
                    <span>Detalhamento dos diferenciais e soluções oferecidas pelo seu negócio.</span>
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
              </ul>`,
  'Preços Personalizado Includes List'
);

safeReplace(
  `<span class="guarantee-text">Sem fidelidade amarrada • Transparência de verdade</span>`,
  `<span class="guarantee-text">Sem fidelidade obrigatória • Suporte prioritário</span>`,
  'Preços Personalizado Guarantee'
);

safeReplace(
  `<div class="pricing-consult-box text-center">
          <div class="consult-box-content">
            <h4 class="consult-box-title">Não sabe qual plano escolher?</h4>
            <p class="consult-box-desc">Fale com nossa equipe e encontre a melhor solução para seu negócio.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20para%20escolher%20o%20melhor%20plano%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-md js-whatsapp-link">
            <span>Falar com Nossa Equipe</span>
          </a>
        </div>`,
  `<div class="pricing-consult-box text-center">
          <div class="consult-box-content">
            <h4 class="consult-box-title">Dúvidas sobre qual plano escolher?</h4>
            <p class="consult-box-desc">Converse com nossa equipe para entender qual formato atende melhor a sua empresa.</p>
          </div>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20para%20escolher%20o%20melhor%20plano%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-md js-whatsapp-link">
            <span>Falar com Nossa Equipe</span>
          </a>
        </div>`,
  'Preços Consult Box'
);

// ==========================================
// 4. HUB DE MAIS INFORMAÇÕES TABS
// ==========================================
safeReplace(
  `<span>Foco total em vendas pelo WhatsApp, velocidade e suporte sem dor de cabeça</span>`,
  `<span>Soluções digitais pensadas para facilitar o contato com seus clientes</span>`,
  'Hub Tab 1 Desc'
);

safeReplace(
  `<div class="extra-tab-badge badge-warning-tab">Análise de Mercado</div>
            <div class="extra-tab-icon-svg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div>
            <div class="extra-tab-content">
              <strong>A Realidade do Mercado</strong>
              <span>Por que só redes sociais não bastam e a importância de ter sua "casa própria" no Google</span>
            </div>`,
  `<div class="extra-tab-badge">Presença Digital</div>
            <div class="extra-tab-icon-svg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div>
            <div class="extra-tab-content">
              <strong>Presença Digital Completa</strong>
              <span>O papel das redes sociais e do site próprio reunindo tudo em um só lugar</span>
            </div>`,
  'Hub Tab 2 Content'
);

safeReplace(
  `<span>Prazos de entrega, forma de pagamento em 2x, manutenção mensal e suporte</span>`,
  `<span>Prazos, pagamentos, hospedagem, manutenção mensal e suporte</span>`,
  'Hub Tab 3 Desc'
);

// ==========================================
// 5. DIFERENCIAIS (#promessa)
// ==========================================
safeReplace(
  `<h2 class="section-title">Por que escolher a nossa agência?</h2>
          <p class="section-description">
            Sem termos difíceis ou enrolação técnica. Nós entregamos resultados práticos que colocam mais dinheiro no seu caixa.
          </p>`,
  `<h2 class="section-title">Por que escolher a Rida?</h2>
          <p class="section-description">
            Soluções digitais pensadas para facilitar o contato com seus clientes, com comunicação clara e suporte técnico contínuo.
          </p>`,
  'Promessa Header'
);

safeReplace(
  `<!-- Tópico 1: Celular -->
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </div>
            <div class="benefit-tag">Mobile First</div>
            <h3 class="benefit-title">Focado no Celular</h3>
            <p class="benefit-text">
              90% dos seus clientes vão acessar seu site pelo celular. Nossos sites são criados para serem rápidos e perfeitos nas telas pequenas.
            </p>
            <div class="benefit-detail">
              <span>Layout adaptável para qualquer tamanho de tela</span>
            </div>
          </div>`,
  `<!-- Tópico 1: Celular -->
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
          </div>`,
  'Promessa Benefit 1'
);

safeReplace(
  `<!-- Tópico 2: Direto ao Ponto -->
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div class="benefit-tag">Alta Conversão</div>
            <h3 class="benefit-title">Direto ao Ponto</h3>
            <p class="benefit-text">
              Sem enrolação. Um site limpo, que carrega rápido e leva o cliente direto para o seu WhatsApp ou sistema de agendamento.
            </p>
            <div class="benefit-detail">
              <span>Zero telas complicadas. O cliente clica e compra</span>
            </div>
          </div>`,
  `<!-- Tópico 2: Direto ao Ponto -->
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
          </div>`,
  'Promessa Benefit 2'
);

safeReplace(
  `<!-- Tópico 3: Suporte Paz de Espírito -->
          <div class="benefit-card">
            <div class="benefit-icon-wrapper">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="benefit-tag">Zero Preocupação</div>
            <h3 class="benefit-title">Suporte "Paz de Espírito"</h3>
            <p class="benefit-text">
              Esqueça a dor de cabeça com tecnologia. Precisa trocar uma foto, mudar um preço ou atualizar o horário? Basta mandar um WhatsApp para nós e fazemos isso por você.
            </p>
            <div class="benefit-detail">
              <span>Você atende seus clientes, nós cuidamos do site</span>
            </div>
          </div>`,
  `<!-- Tópico 3: Suporte Paz de Espírito -->
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
          </div>`,
  'Promessa Benefit 3'
);

// ==========================================
// 6. PRESENÇA DIGITAL (#problema)
// ==========================================
const oldProblemaInner = `<section class="section problem-section" id="problema">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">A Realidade do Mercado</span>
          <h2 class="section-title">Só ter redes sociais não é mais suficiente.</h2>
          <p class="section-description">
            Imagine se o Instagram ou o Facebook saem do ar amanhã. Onde seus clientes vão te encontrar? Depender apenas de uma plataforma é arriscado. Com um site próprio, você aparece no Google, passa muito mais credibilidade e mostra aos seus clientes que a sua empresa é profissional de verdade.
          </p>
        </div>

        <!-- Comparativo Visual: Aluguel vs Casa Própria -->
        <div class="comparison-grid">
          <!-- Card Ruim: Redes Sociais -->
          <div class="compare-card danger-card">
            <div class="compare-header">
              <div class="compare-badge badge-danger">"Morar de Aluguel"</div>
              <h3>Apenas Instagram & Facebook</h3>
            </div>
            <ul class="compare-list">
              <li>
                <span class="list-icon icon-cross">✕</span>
                <div>
                  <strong>O algoritmo decide quem te vê</strong>
                  <p>Menos de 5% dos seus seguidores recebem o que você posta se você não pagar anúncios.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-cross">✕</span>
                <div>
                  <strong>Se a rede cair, seu comércio para</strong>
                  <p>Instabilidades e bloqueios de conta deixam seus clientes sem ter como falar com você.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-cross">✕</span>
                <div>
                  <strong>Invisível para quem pesquisa no Google</strong>
                  <p>Quando alguém procura "pizzaria perto de mim" ou "barbearia no centro", perfis de redes sociais perdem feio para sites.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-cross">✕</span>
                <div>
                  <strong>Parece amador</strong>
                  <p>Grandes clientes desconfiam de empresas que só têm uma conta no Instagram e nenhuma página oficial.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Card Bom: Site Próprio -->
          <div class="compare-card success-card">
            <div class="compare-header">
              <div class="compare-badge badge-success">"Sua Casa Própria"</div>
              <h3>Site Profissional + Google</h3>
            </div>
            <ul class="compare-list">
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Você é dono da sua página 24h</strong>
                  <p>Nenhuma mudança de algoritmo vai tirar sua empresa do ar ou sumir com seus clientes.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Destaque no Google da sua região</strong>
                  <p>Apareça para clientes quentes que já estão pesquisando exatamente o que você vende.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Botão direto para o seu WhatsApp</strong>
                  <p>O cliente entra no site, vê seus preços/fotos e com 1 clique já está no seu WhatsApp conversando com você.</p>
                </div>
              </li>
              <li>
                <span class="list-icon icon-check">✓</span>
                <div>
                  <strong>Credibilidade imediata</strong>
                  <p>Transmite segurança, profissionalismo e permite cobrar valores mais justos pelo seu trabalho.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Chamada de transição -->
        <div class="problem-footer-cta text-center">
          <p>Não deixe o seu faturamento na mão dos algoritmos.</p>
          <a href="https://wa.me/5512974070207?text=Ol%C3%A1!%20Quero%20tirar%20meu%20neg%C3%B3cio%20do%20aluguel%20e%20criar%20um%20site%20pr%C3%B3prio." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-md js-whatsapp-link">
            <span>Quero construir a casa própria do meu negócio</span>
          </a>
        </div>
      </div>
    </section>`;

const newProblemaInner = `<section class="section problem-section" id="problema">
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

safeReplace(oldProblemaInner, newProblemaInner, 'Problema Section Full');

// ==========================================
// 7. PERGUNTAS FREQUENTES (#faq)
// ==========================================
const oldFaqInner = `<section class="section faq-section" id="faq">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Tire Suas Dúvidas</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-description">Respostas claras para você fechar com tranquilidade total.</p>
        </div>

        <div class="faq-accordion-list">
          <!-- FAQ Item 1 -->
          <details class="faq-item" open>
            <summary class="faq-question">
              <span>Eu preciso entender de computador ou internet para ter um site?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Absolutamente não! Cuidamos de 100% da parte técnica, da hospedagem, da segurança e da configuração. Você só precisa mandar as informações do seu comércio e responder seus clientes no WhatsApp.</p>
            </div>
          </details>

          <!-- FAQ Item 2 -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>Em quantos dias o meu site fica pronto?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Normalmente entregamos a primeira versão pronta para uso entre 3 a 7 dias úteis após você enviar suas fotos e informações básicas.</p>
            </div>
          </details>

          <!-- FAQ Item 3 -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>Como funciona a forma de pagamento do Setup?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>É super seguro para você: você paga apenas 50% para iniciarmos o projeto (R$ 248,50 no Plano Essencial ou R$ 398,50 no Plano Personalizado) e os 50% restantes somente quando o site estiver pronto, revisado e aprovado por você.</p>
            </div>
          </details>

          <!-- FAQ Item 4 -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>O que acontece se eu precisar mudar um preço ou colocar uma foto nova?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Isso já está incluso na sua manutenção mensal (R$ 47/mês no Plano Essencial ou R$ 77/mês no Plano Personalizado)! Basta nos enviar uma mensagem no WhatsApp com o novo preço ou a nova foto e nós atualizamos para você sem burocracia.</p>
            </div>
          </details>

          <!-- FAQ Item 5 -->
          <details class="faq-item">
            <summary class="faq-question">
              <span>E se eu ainda não tiver logotipo oficial?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p>Não se preocupe. Nós criamos uma assinatura tipográfica limpa e profissional com o nome da sua empresa para o cabeçalho do site sem custo adicional.</p>
            </div>
          </details>
        </div>
      </div>
    </section>`;

const newFaqInner = `<section class="section faq-section" id="faq">
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

safeReplace(oldFaqInner, newFaqInner, 'FAQ Section Full');

// ==========================================
// 8. RODAPÉ (#contato)
// ==========================================
const oldFooterInner = `<footer class="site-footer" id="contato">
    <div class="container footer-main">
      <div class="footer-grid">
        
        <!-- Coluna 1: Logo e Identidade -->
        <div class="footer-col footer-about">
          <div class="brand-logo footer-logo">
            <div class="logo-box">
              <img src="assets/images/logo-rida.png" alt="Logo Rida" class="brand-logo-img">
            </div>
            <div class="brand-text">
              <span class="agency-title js-agency-name">Rida</span>
              <span class="agency-tagline">Sites Profissionais</span>
            </div>
          </div>
          <p class="footer-desc">
            Ajudando comércios e negócios locais a conquistarem a sua casa própria na internet com sites rápidos, bonitos e vendedores.
          </p>
          <div class="founders-badge">
            <span class="founders-label">Fundadores:</span>
            <strong>Davi Xavier &amp; Ricardo Veríssimo</strong>
          </div>
        </div>

        <!-- Coluna 2: Navegação Rápida -->
        <div class="footer-col">
          <h4 class="footer-heading">Navegação</h4>
          <ul class="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#portfolio">Projetos</a></li>
            <li><a href="#preco">Preços</a></li>
            <li><a href="#promessa">Diferenciais</a></li>
            <li><a href="#problema">O Problema</a></li>
            <li><a href="#como-funciona">Começando</a></li>
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
                <span class="contact-type">WhatsApp</span>
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
                <span class="contact-type">WhatsApp</span>
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
                <span class="contact-type">E-mail</span>
                <a href="mailto:rida.xv10@gmail.com" class="contact-link js-contact-email">
                  rida.xv10@gmail.com
                </a>
              </div>
            </li>
          </ul>

          <div class="footer-cta-box" style="margin-top: 14px;">
            <span class="cta-box-text">Quer iniciar o seu projeto hoje?</span>
            <a href="https://wa.me/5512974070207" target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-sm js-whatsapp-link">
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Copyright e Assinatura -->
      <div class="footer-bottom">
        <div class="footer-bottom-copy">
          <p>
            Desenvolvido por <strong class="js-agency-name">Rida</strong> © 2026 - Ajudando negócios locais a crescerem.
          </p>
          <p class="creators-note">
            Criado por <strong>Davi Xavier</strong> e <strong>Ricardo Veríssimo</strong>.
          </p>
        </div>
        <div class="footer-bottom-badges">
          <span class="pill-secure">Hospedagem Segura</span>
          <span class="pill-secure">Mobile First</span>
        </div>
      </div>
    </div>
  </footer>`;

const newFooterInner = `<footer class="site-footer" id="contato">
    <div class="container footer-main">
      <div class="footer-grid">
        
        <!-- Coluna 1: Logo e Identidade -->
        <div class="footer-col footer-about">
          <div class="brand-logo footer-logo">
            <div class="logo-box">
              <img src="assets/images/logo-rida.png" alt="Logo Rida" class="brand-logo-img">
            </div>
            <div class="brand-text">
              <span class="agency-title js-agency-name">Rida</span>
              <span class="agency-tagline">Sites Profissionais</span>
            </div>
          </div>
          <p class="footer-desc">
            Criação de sites modernos, rápidos e focados em facilitar o contato entre clientes e empresas.
          </p>
          <div class="founders-badge">
            <span class="founders-label">Fundadores:</span>
            <strong>Davi Xavier &amp; Ricardo Veríssimo</strong>
          </div>
        </div>

        <!-- Coluna 2: Navegação Rápida -->
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

safeReplace(oldFooterInner, newFooterInner, 'Footer Section Full');

// ==========================================
// 9. VERSION BUMP
// ==========================================
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=9.0');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=9.0');

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n>>> All sections successfully updated in index.html with 100% precision! <<<');
