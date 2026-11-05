const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ==============================================================================
// 1. UPDATE PRICING SECTION IN index.html
// ==============================================================================
const precoSectionStart = html.indexOf('<section class="section pricing-section sphere-panel" id="preco"');
const precoSectionEnd = html.indexOf('</section>', precoSectionStart) + '</section>'.length;

const newPrecoSection = `<section class="section pricing-section sphere-panel" id="preco" style="display: none;">
        <div class="panel-header-close-bar text-right container"><button type="button" class="btn-hide-sphere-panel js-close-preco">✕ Fechar Área de Preço</button></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Transparência Total</span>
          <h2 class="section-title">Um investimento que cabe no bolso do seu negócio.</h2>
          <p class="section-description">
            Sem orçamentos surpresa ou taxas escondidas. Escolha o formato ideal para o momento da sua empresa:
          </p>
        </div>

        <!-- Cards de Preços (Grid de Planos) -->
        <div class="pricing-plans-grid">
          
          <!-- Plano 01: Plano Essencial -->
          <div class="pricing-card">
            <div class="pricing-badge-popular">Plano Essencial</div>
            
            <div class="plan-header text-center">
              <h3 class="plan-title">Plano Essencial</h3>
              <p class="plan-desc">Para negócios que precisam de uma presença profissional na internet.</p>
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
                <div class="payment-terms">
                  <span class="badge-terms">Condição Facilitada</span>
                  <p>Pago em 2x: <strong>50% para iniciar (R$ 248,50)</strong> e <strong>50% na entrega (R$ 248,50)</strong> com tudo aprovado por você.</p>
                </div>
              </div>

              <!-- Divider decorativo com linhas pretas -->
              <div class="pricing-divider">
                <span>+</span>
              </div>

              <!-- Mensalidade Box -->
              <div class="price-block monthly-block">
                <span class="price-label">Manutenção Mensal</span>
                <div class="price-value">
                  <span class="currency">R$</span>
                  <span class="amount">47</span>
                  <span class="cents">,00</span>
                  <span class="period">/ mês</span>
                </div>
                <p class="monthly-subtext">Hospedagem segura e suporte para seu comércio nunca parar.</p>
              </div>
            </div>

            <!-- O que inclui? -->
            <div class="pricing-includes">
              <div class="text-center" style="margin-bottom: 12px;">
                <span class="includes-plus-badge" style="background-color: var(--bg-cream-primary); border-color: var(--border-black); color: var(--navy-primary);">Recursos Inclusos no Plano</span>
                <h4 class="includes-title" style="margin-bottom: 0;">O que está incluso:</h4>
              </div>
              <ul class="includes-list">
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
                    <span>O visitante clica e já cai conversando diretamente com você.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Localização e horários</strong>
                    <span>Facilidade para clientes encontrarem seu endereço e funcionamento.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Hospedagem e certificado SSL</strong>
                    <span>Site no ar 24h com segurança e o cadeado verde do Google.</span>
                  </div>
                </li>
                <li>
                  <div class="check-icon">✓</div>
                  <div class="include-desc">
                    <strong>Suporte e pequenas atualizações</strong>
                    <span>Troca de dados, fotos e horários sempre que precisar.</span>
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
              <span class="guarantee-text">Sem fidelidade amarrada • Transparência de verdade</span>
            </div>
          </div>

          <!-- Plano 02: Plano Personalizado -->
          <div class="pricing-card featured-pricing-card">
            <div class="pricing-badge-popular badge-featured">Destaque • Mais Completo</div>
            
            <div class="plan-header text-center">
              <h3 class="plan-title">Plano Personalizado</h3>
              <p class="plan-desc">Para empresas que precisam de uma apresentação mais completa.</p>
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
                <div class="payment-terms">
                  <span class="badge-terms">Condição Facilitada</span>
                  <p>Pago em 2x: <strong>50% para iniciar (R$ 398,50)</strong> e <strong>50% na entrega (R$ 398,50)</strong> com tudo aprovado por você.</p>
                </div>
              </div>

              <!-- Divider decorativo com linhas pretas -->
              <div class="pricing-divider">
                <span>+</span>
              </div>

              <!-- Mensalidade Box -->
              <div class="price-block monthly-block">
                <span class="price-label">Manutenção Mensal</span>
                <div class="price-value">
                  <span class="currency">R$</span>
                  <span class="amount">77</span>
                  <span class="cents">,00</span>
                  <span class="period">/ mês</span>
                </div>
                <p class="monthly-subtext">Hospedagem de alta velocidade e atualizações prioritárias.</p>
              </div>
            </div>

            <!-- O que inclui? -->
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
              <span class="guarantee-text">Sem fidelidade amarrada • Transparência de verdade</span>
            </div>
          </div>

        </div>

        <!-- Banner de Orientação no Final da Seção de Preços -->
        <div class="pricing-consult-box text-center">
          <div class="consult-box-content">
            <h4 class="consult-box-title">Não sabe qual plano escolher?</h4>
            <p class="consult-box-desc">Fale com nossa equipe e encontre a melhor solução para seu negócio.</p>
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

html = html.substring(0, precoSectionStart) + newPrecoSection + html.substring(precoSectionEnd);

// ==============================================================================
// 2. UPDATE MOBILE SHOWCASE CARD PRICE FOR DOCERIA IN index.html
// ==============================================================================
html = html.replace(
  'Setup R$ 697 (ou 2x R$ 348,50) • R$ 67/mês',
  'Setup R$ 797 (ou 2x R$ 398,50) • R$ 77/mês'
);

// ==============================================================================
// 3. UPDATE script.js PRICES FOR PERSONALIZADO (R$ 797 / R$ 77)
// ==============================================================================
js = js.replace(/Setup R\$ 697 \(2x R\$ 348,50\)/g, 'Setup R$ 797 (2x R$ 398,50)');
js = js.replace(/R\$ 67\/mês/g, 'R$ 77/mês');

// Save updated files
fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('script.js', js, 'utf8');
console.log('Successfully updated index.html and script.js with new plan details and prices!');

