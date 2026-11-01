const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ==============================================================================
// 1. UPDATE CSS
// ==============================================================================

const newCssRules = `
/* ==============================================================================
   ESTILOS DA CENTRAL DE INFORMAÇÕES ADICIONAIS (#mais-informacoes)
   ============================================================================== */
.extra-hub-section {
  padding: 80px 0;
  background: var(--bg-cream);
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

body.dark-mode .extra-hub-section {
  background: #0d1117;
  border-top-color: #283344;
}

.extra-tabs-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 36px 0 28px 0;
}

.btn-extra-tab {
  background: var(--bg-cream-card);
  border: var(--border-black);
  border-radius: 18px;
  box-shadow: var(--shadow-neo);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  user-select: none;
}

body.dark-mode .btn-extra-tab {
  background: #151b26;
  border-color: #283344;
  box-shadow: 4px 4px 0px #030712;
}

.btn-extra-tab:hover {
  transform: translateY(-3px);
  box-shadow: 6px 6px 0px var(--black-line);
}

body.dark-mode .btn-extra-tab:hover {
  box-shadow: 6px 6px 0px #030712;
  border-color: #3b82f6;
}

.btn-extra-tab.is-active {
  background: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 4px 4px 0px #2563EB;
}

body.dark-mode .btn-extra-tab.is-active {
  background: #1c2433;
  border-color: #60A5FA;
  box-shadow: 4px 4px 0px #2563EB;
}

.extra-tab-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 9px;
  border-radius: 100px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563EB;
  margin-bottom: 12px;
}

body.dark-mode .extra-tab-badge {
  background: rgba(96, 165, 250, 0.15);
  color: #60A5FA;
}

.badge-warning-tab {
  background: rgba(234, 88, 12, 0.1);
  color: #EA580C;
}

body.dark-mode .badge-warning-tab {
  background: rgba(251, 146, 60, 0.15);
  color: #FB923C;
}

.extra-tab-icon {
  font-size: 1.8rem;
  margin-bottom: 10px;
  line-height: 1;
}

.extra-tab-content {
  flex-grow: 1;
}

.extra-tab-content strong {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--navy-primary);
  margin-bottom: 6px;
  line-height: 1.25;
}

body.dark-mode .extra-tab-content strong {
  color: #F8FAFC;
}

.extra-tab-content span {
  display: block;
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.45;
}

body.dark-mode .extra-tab-content span {
  color: #94A3B8;
}

.extra-tab-action {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 800;
  color: #2563EB;
}

body.dark-mode .extra-tab-action {
  color: #60A5FA;
}

.tab-action-arrow {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.btn-extra-tab.is-active .tab-action-arrow {
  transform: rotate(180deg);
}

.btn-extra-tab.is-active .tab-action-text::after {
  content: ' (Aberto)';
}

/* Painéis de Conteúdo On-Demand */
.extra-panels-wrapper {
  margin-top: 24px;
}

.extra-panel {
  border-radius: 20px;
  overflow: hidden;
  animation: fadeInPanel 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInPanel {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-inner-box {
  background: var(--bg-cream-card);
  border: var(--border-black);
  border-radius: 20px;
  box-shadow: var(--shadow-neo);
  padding: 32px 24px;
  position: relative;
}

body.dark-mode .panel-inner-box {
  background: #151b26;
  border-color: #283344;
  box-shadow: 4px 4px 0px #030712;
}

.panel-close-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.12);
}

body.dark-mode .panel-close-top {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.panel-notice-tag {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--navy-primary);
}

body.dark-mode .panel-notice-tag {
  color: #F8FAFC;
}

.btn-panel-close {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--navy-primary);
  font-size: 0.8rem;
  font-weight: 800;
  padding: 6px 14px;
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
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
}

body.dark-mode .panel-close-bottom {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.btn-panel-hide {
  background: var(--navy-primary);
  color: #FFFFFF;
  border: var(--border-black);
  box-shadow: var(--shadow-neo-sm);
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
  box-shadow: 2px 2px 0px #030712;
}

.btn-panel-hide:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-neo);
}

/* ==============================================================================
   ESTILOS DAS CATEGORIAS DA VITRINE 3D (MATHIAS ADOLFSSON)
   ============================================================================== */
.mathias-category-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 4px 6px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  max-width: 100%;
}

.mathias-category-scroll::-webkit-scrollbar {
  display: none;
}

.mathias-cat-btn {
  background: transparent;
  border: none;
  color: #94A3B8;
  padding: 7px 15px;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.22s ease;
  user-select: none;
  flex-shrink: 0;
}

.mathias-cat-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.08);
}

.mathias-cat-btn.active {
  background: #2563EB;
  color: #FFFFFF;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.5);
  border: 1px solid #60A5FA;
}

.mathias-cat-btn .cat-count {
  background: rgba(255, 255, 255, 0.25);
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 100px;
}

/* ==============================================================================
   ISOLAMENTO TOTAL DO MODAL 3D (SEM NENHUM VAZAMENTO NO MOBILE OU DESKTOP)
   ============================================================================== */
body.mathias-gallery-active {
  overflow: hidden !important;
  touch-action: none !important;
}

html.mathias-gallery-active {
  overflow: hidden !important;
}

body.mathias-gallery-active #mainContent {
  visibility: hidden !important;
}

body.mathias-gallery-active .floating-whatsapp-wrapper,
html.mathias-gallery-active .floating-whatsapp-wrapper,
body.mathias-gallery-active #btnThemeToggle,
body.mathias-gallery-active .site-header {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.mathias-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100% !important;
  height: 100dvh !important;
  z-index: 999999 !important;
  background-color: #07080a !important;
  overflow: hidden !important;
}

.mathias-backdrop {
  background: #07080a !important;
  opacity: 1 !important;
}

/* ==============================================================================
   RESPONSIVIDADE MOBILE DA CENTRAL DE INFORMAÇÕES E MODAL
   ============================================================================== */
@media (max-width: 768px) {
  .extra-tabs-nav {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .btn-extra-tab {
    padding: 18px 16px;
  }

  .extra-tab-content strong {
    font-size: 1.05rem;
  }

  .extra-tab-content span {
    font-size: 0.82rem;
  }

  .mathias-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: max(8px, env(safe-area-inset-top)) 12px 6px 12px;
    display: grid;
    grid-template-columns: 1fr auto;
    row-gap: 8px;
    background: rgba(7, 8, 10, 0.98);
    backdrop-filter: blur(12px);
    z-index: 90;
  }

  .mathias-category-scroll {
    grid-column: 1 / -1;
    width: 100%;
    margin-top: 2px;
    padding: 4px 2px;
    gap: 5px;
  }

  .mathias-cat-btn {
    padding: 6px 11px;
    font-size: 0.72rem;
  }

  .stage-3d-wrapper {
    top: 100px;
    bottom: 84px;
  }

  .card-actions-row {
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .btn-card-visit {
    padding: 7px 4px;
    font-size: 0.72rem;
  }

  .btn-card-whatsapp {
    padding: 7px 4px;
    font-size: 0.72rem;
  }
}

@media (max-width: 480px) {
  .stage-3d-wrapper {
    top: 96px;
    bottom: 82px;
  }

  .mathias-cat-btn {
    padding: 5px 9px;
    font-size: 0.70rem;
    gap: 4px;
  }

  .btn-card-visit span,
  .btn-card-whatsapp span {
    font-size: 0.70rem;
  }
}
`;

css += '\n' + newCssRules;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended new CSS rules to styles.css successfully!');

