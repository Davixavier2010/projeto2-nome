const fs = require('fs');

// 1. READ FILES
let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('styles.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// Update asset version to 3.3 to bypass any cache
html = html.replace(/styles\.css(\?v=[0-9.]+)?/g, 'styles.css?v=3.3');
html = html.replace(/script\.js(\?v=[0-9.]+)?/g, 'script.js?v=3.3');

// 2. EXTRACT SECTIONS FROM index.html
function extractSection(secId) {
  const idAttr = `id="${secId}"`;
  const idx = html.indexOf(idAttr);
  if (idx === -1) throw new Error('Not found: ' + secId);
  const secStart = html.lastIndexOf('<section', idx);
  let secEnd = html.indexOf('</section>', idx);
  secEnd += '</section>'.length;
  return {
    id: secId,
    start: secStart,
    end: secEnd,
    content: html.substring(secStart, secEnd)
  };
}

const sInicio = extractSection('inicio');
const sPortfolio = extractSection('portfolio');
const sPreco = extractSection('preco');
const sPromessa = extractSection('promessa');
const sProblema = extractSection('problema');
const sComoFunciona = extractSection('como-funciona');
const sFaq = extractSection('faq');

// Build the new Extra Hub Section (#mais-informacoes)
const extraHubHtml = `    <!-- ================= 5. CENTRAL DE INFORMAÇÕES ADICIONAIS (ON DEMAND) ================= -->
    <section class="section extra-hub-section" id="mais-informacoes">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Informações Detalhadas</span>
          <h2 class="section-title">Deseja saber mais antes de contratar?</h2>
          <p class="section-description">
            Clique no assunto de seu interesse para ver todos os detalhes e diferenciais da nossa agência:
          </p>
        </div>

        <!-- 3 Botões de Acesso Rápido -->
        <div class="extra-tabs-nav" role="tablist">
          <button type="button" class="btn-extra-tab" data-target="panel-promessa" role="tab" aria-selected="false" aria-controls="panel-promessa">
            <div class="extra-tab-badge">Diferenciais</div>
            <div class="extra-tab-icon">📌</div>
            <div class="extra-tab-content">
              <strong>Por Que Nos Escolher?</strong>
              <span>Foco total em vendas pelo WhatsApp, velocidade e suporte sem dor de cabeça</span>
            </div>
            <div class="extra-tab-action">
              <span class="tab-action-text">Ver detalhes</span>
              <span class="tab-action-arrow">↓</span>
            </div>
          </button>

          <button type="button" class="btn-extra-tab" data-target="panel-problema" role="tab" aria-selected="false" aria-controls="panel-problema">
            <div class="extra-tab-badge badge-warning-tab">Análise de Mercado</div>
            <div class="extra-tab-icon">📊</div>
            <div class="extra-tab-content">
              <strong>A Realidade do Mercado</strong>
              <span>Por que só redes sociais não bastam e a importância de ter sua "casa própria" no Google</span>
            </div>
            <div class="extra-tab-action">
              <span class="tab-action-text">Ver comparativo</span>
              <span class="tab-action-arrow">↓</span>
            </div>
          </button>

          <button type="button" class="btn-extra-tab" data-target="panel-faq" role="tab" aria-selected="false" aria-controls="panel-faq">
            <div class="extra-tab-badge">Tire Dúvidas</div>
            <div class="extra-tab-icon">❓</div>
            <div class="extra-tab-content">
              <strong>Dúvidas Frequentes (FAQ)</strong>
              <span>Prazos de entrega, forma de pagamento em 2x, manutenção mensal e suporte</span>
            </div>
            <div class="extra-tab-action">
              <span class="tab-action-text">Ver perguntas</span>
              <span class="tab-action-arrow">↓</span>
            </div>
          </button>
        </div>

        <!-- Painéis de Conteúdo On-Demand -->
        <div class="extra-panels-wrapper">
          <!-- Painel 1: Promessa / Diferenciais -->
          <div class="extra-panel" id="panel-promessa" style="display: none;">
            <div class="panel-inner-box">
              <div class="panel-close-top">
                <span class="panel-notice-tag">📌 Nossos Diferenciais</span>
                <button type="button" class="btn-panel-close js-close-extra-panel" aria-label="Fechar painel">✕ Fechar</button>
              </div>
              ${sPromessa.content}
              <div class="panel-close-bottom text-center">
                <button type="button" class="btn-panel-hide js-close-extra-panel">
                  <span>▲ Ocultar Diferenciais</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Painel 2: Problema / Realidade do Mercado -->
          <div class="extra-panel" id="panel-problema" style="display: none;">
            <div class="panel-inner-box">
              <div class="panel-close-top">
                <span class="panel-notice-tag">📊 A Realidade do Mercado</span>
                <button type="button" class="btn-panel-close js-close-extra-panel" aria-label="Fechar painel">✕ Fechar</button>
              </div>
              ${sProblema.content}
              <div class="panel-close-bottom text-center">
                <button type="button" class="btn-panel-hide js-close-extra-panel">
                  <span>▲ Ocultar Análise de Mercado</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Painel 3: FAQ / Perguntas Frequentes -->
          <div class="extra-panel" id="panel-faq" style="display: none;">
            <div class="panel-inner-box">
              <div class="panel-close-top">
                <span class="panel-notice-tag">❓ Perguntas Frequentes</span>
                <button type="button" class="btn-panel-close js-close-extra-panel" aria-label="Fechar painel">✕ Fechar</button>
              </div>
              ${sFaq.content}
              <div class="panel-close-bottom text-center">
                <button type="button" class="btn-panel-hide js-close-extra-panel">
                  <span>▲ Ocultar Perguntas Frequentes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

// Reassemble mainContent:
// <main id="mainContent">
// 1. sInicio
// 2. sPortfolio
// 3. sPreco
// 4. sComoFunciona
// 5. extraHubHtml
// </main>

const mainStartIdx = html.indexOf('<main id="mainContent">');
const mainEndIdx = html.indexOf('</main>');

if (mainStartIdx === -1 || mainEndIdx === -1) {
  throw new Error('Could not find main tag boundaries!');
}

const beforeMain = html.substring(0, mainStartIdx + '<main id="mainContent">'.length);
const afterMain = html.substring(mainEndIdx);

const newMainContent = `
${sInicio.content}

${sPortfolio.content}

${sPreco.content}

${sComoFunciona.content}

${extraHubHtml}
`;

html = beforeMain + newMainContent + afterMain;

// 3. UPDATE #mathiasGalleryModal HEADER IN index.html
// Replace .mathias-filter-pills with .mathias-category-scroll
const oldModalHeaderRegex = /<header class="mathias-header">[\s\S]*?<\/header>/;

const newModalHeaderHtml = `<header class="mathias-header">
      <div class="brand-group">
        <h2 class="mathias-brand-title">Rida • Vitrine de Projetos</h2>
        <p class="mathias-brand-sub">Modelos Reais • Experiência 3D</p>
      </div>

      <!-- Botão Fechar (Estilo Mathias Adolfsson) -->
      <button type="button" class="btn-close-gallery js-close-mathias-gallery" id="btnCloseMathiasGallery" aria-label="Fechar Galeria">
        <span>Fechar</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <!-- Barra de Categorias Horizontal (Scroll Touch no Celular e Desktop) -->
      <div class="mathias-category-scroll" role="tablist" aria-label="Categorias de Sites">
        <button type="button" class="mathias-cat-btn active" data-category="all" role="tab" aria-selected="true">
          <span class="cat-icon">🌐</span>
          <span class="cat-text">Todos</span>
          <span class="cat-count">7</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="petshop" role="tab" aria-selected="false">
          <span class="cat-icon">🐾</span>
          <span class="cat-text">Pet Shop</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="padaria" role="tab" aria-selected="false">
          <span class="cat-icon">🥖</span>
          <span class="cat-text">Padaria</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="academia" role="tab" aria-selected="false">
          <span class="cat-icon">🏋️</span>
          <span class="cat-text">Academia</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="doceria" role="tab" aria-selected="false">
          <span class="cat-icon">🍰</span>
          <span class="cat-text">Doceria</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="salao" role="tab" aria-selected="false">
          <span class="cat-icon">✂️</span>
          <span class="cat-text">Salão de Beleza</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="jornalismo" role="tab" aria-selected="false">
          <span class="cat-icon">📰</span>
          <span class="cat-text">Jornalismo</span>
        </button>
        <button type="button" class="mathias-cat-btn" data-category="cafeteria" role="tab" aria-selected="false">
          <span class="cat-icon">☕</span>
          <span class="cat-text">Cafeteria</span>
        </button>
      </div>
    </header>`;

html = html.replace(oldModalHeaderRegex, newModalHeaderHtml);

// Save updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with new flow and category header!');

