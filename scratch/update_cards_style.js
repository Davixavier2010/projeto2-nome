const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const extraHubStart = css.indexOf('.extra-hub-section {');
const marker = '/* ==============================================================================\n   ESTILOS DAS CATEGORIAS DA VITRINE 3D (MATHIAS ADOLFSSON)';
const extraHubEnd = css.indexOf(marker, extraHubStart);

console.log('extraHubStart:', extraHubStart, 'extraHubEnd:', extraHubEnd);

const newExtraHubCss = `/* ==============================================================================
   SEÇÃO MAIS INFORMAÇÕES (ESTILO MODERNO, CLEAN & MADURO - SEM ESTILO DESENHO)
   Inspirado na linguagem visual de alta tecnologia da vitrine 3D e esferas
   ============================================================================== */
.extra-hub-section {
  padding: 88px 0;
  background: transparent;
  position: relative;
}

#mais-informacoes .section-tag {
  background-color: #0B192C;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  border-radius: 100px;
  padding: 6px 18px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #FFFFFF;
  margin-bottom: 16px;
}

body.dark-mode #mais-informacoes .section-tag {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.extra-tabs-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 40px 0 32px 0;
}

/* Card Moderno: Sem borda de desenho grossa, sem sombra offset dura */
.btn-extra-tab {
  background: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 24px -4px rgba(15, 23, 42, 0.07);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  user-select: none;
}

body.dark-mode .btn-extra-tab {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
}

/* Hover suave com elevação realista e sem salto brusco */
.btn-extra-tab:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 35px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06);
  border-color: rgba(37, 99, 235, 0.3);
}

body.dark-mode .btn-extra-tab:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -6px rgba(0, 0, 0, 0.7), 0 0 24px rgba(37, 99, 235, 0.15);
  border-color: rgba(96, 165, 250, 0.4);
}

/* Estado Ativo com anel de foco refinado */
.btn-extra-tab.is-active {
  background: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 0 14px 30px -4px rgba(37, 99, 235, 0.2), 0 0 0 2px rgba(37, 99, 235, 0.25);
}

body.dark-mode .btn-extra-tab.is-active {
  background: #111E33;
  border-color: #60A5FA;
  box-shadow: 0 14px 32px -4px rgba(37, 99, 235, 0.35), 0 0 0 2px rgba(96, 165, 250, 0.3);
}

/* Badges de Categoria: Pílulas modernas com cores preservadas */
.extra-tab-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 5px 12px;
  border-radius: 100px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563EB;
  border: 1px solid rgba(37, 99, 235, 0.18);
  margin-bottom: 16px;
  transition: all 0.25s ease;
}

body.dark-mode .extra-tab-badge {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border-color: rgba(96, 165, 250, 0.25);
}

/* Badge Laranja: Análise de Mercado */
.badge-warning-tab {
  background: rgba(234, 88, 12, 0.08) !important;
  color: #EA580C !important;
  border-color: rgba(234, 88, 12, 0.2) !important;
}

body.dark-mode .badge-warning-tab {
  background: rgba(249, 115, 22, 0.15) !important;
  color: #FB923C !important;
  border-color: rgba(251, 146, 60, 0.25) !important;
}

/* Ícones dentro dos cards: Embalados em cápsulas circulares refinadas */
.extra-tab-icon-svg {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 99, 235, 0.08);
  color: #2563EB;
  margin-bottom: 16px;
  transition: transform 0.25s ease;
}

body.dark-mode .extra-tab-icon-svg {
  background: rgba(59, 130, 246, 0.12);
  color: #60A5FA;
}

.btn-extra-tab:nth-child(2) .extra-tab-icon-svg {
  background: rgba(234, 88, 12, 0.08);
  color: #EA580C;
}

body.dark-mode .btn-extra-tab:nth-child(2) .extra-tab-icon-svg {
  background: rgba(249, 115, 22, 0.12);
  color: #FB923C;
}

.btn-extra-tab:hover .extra-tab-icon-svg {
  transform: scale(1.08);
}

.extra-tab-content {
  flex-grow: 1;
}

.extra-tab-content strong {
  display: block;
  font-size: 1.18rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 8px;
  line-height: 1.3;
}

body.dark-mode .extra-tab-content strong {
  color: #F8FAFC;
}

.extra-tab-content span {
  display: block;
  font-size: 0.88rem;
  color: #64748B;
  line-height: 1.5;
}

body.dark-mode .extra-tab-content span {
  color: #94A3B8;
}

/* Ações e Links */
.extra-tab-action {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.84rem;
  font-weight: 800;
  color: #2563EB;
  transition: gap 0.2s ease;
}

body.dark-mode .extra-tab-action {
  color: #60A5FA;
}

.btn-extra-tab:nth-child(2) .extra-tab-action {
  color: #EA580C;
}

body.dark-mode .btn-extra-tab:nth-child(2) .extra-tab-action {
  color: #FB923C;
}

.btn-extra-tab:hover .extra-tab-action {
  gap: 10px;
}

.tab-action-arrow {
  font-size: 0.95rem;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-extra-tab.is-active .tab-action-arrow {
  transform: rotate(180deg);
}

.btn-extra-tab.is-active .tab-action-text::after {
  content: ' (Aberto)';
}

/* Painéis de Conteúdo On-Demand */
.extra-panels-wrapper {
  margin-top: 28px;
}

.extra-panel {
  border-radius: 24px;
  overflow: hidden;
  animation: fadeInPanel 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInPanel {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-inner-box {
  background: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  box-shadow: 0 16px 40px -6px rgba(15, 23, 42, 0.08);
  padding: 36px 32px;
  position: relative;
}

body.dark-mode .panel-inner-box {
  background: #0F172A;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 48px -8px rgba(0, 0, 0, 0.65);
}

.panel-close-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

body.dark-mode .panel-close-top {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.panel-notice-tag {
  font-size: 0.92rem;
  font-weight: 800;
  color: #0F172A;
}

body.dark-mode .panel-notice-tag {
  color: #F8FAFC;
}

.btn-panel-close {
  background: rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: #0F172A;
  font-size: 0.82rem;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

body.dark-mode .btn-panel-close {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
}

.btn-panel-close:hover {
  background: #EF4444;
  color: #FFFFFF;
  border-color: #EF4444;
}

.panel-close-bottom {
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  text-align: center;
}

body.dark-mode .panel-close-bottom {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.btn-panel-hide {
  background: #0B192C;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  padding: 10px 24px;
  border-radius: 100px;
  font-size: 0.86rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

body.dark-mode .btn-panel-hide {
  background: #2563EB;
  border-color: #60A5FA;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
}

.btn-panel-hide:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Modernização dos cards internos para remover qualquer traço de desenho */
.panel-inner-box .benefit-card,
.panel-inner-box .compare-card,
.panel-inner-box .faq-item {
  border: 1px solid rgba(15, 23, 42, 0.08) !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05) !important;
  border-radius: 20px !important;
}

body.dark-mode .panel-inner-box .benefit-card,
body.dark-mode .panel-inner-box .compare-card,
body.dark-mode .panel-inner-box .faq-item {
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35) !important;
}

@media (max-width: 991px) {
  .extra-tabs-nav {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .btn-extra-tab {
    padding: 22px 20px;
  }
  .panel-inner-box {
    padding: 24px 18px;
  }
}

`;

css = css.slice(0, extraHubStart) + newExtraHubCss + css.slice(extraHubEnd);
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Successfully updated styles.css!');
