const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// ==============================================================================
// 1. UPDATE COMO FUNCIONA (PROCESS SECTION) STYLING
// ==============================================================================

const processCss = `
/* ================= 6. COMO FUNCIONA (ESTILO MODERNO, CLEAN & MADURO) ================= */
.process-section {
  background-color: transparent;
  padding: 88px 0;
  position: relative;
}

#como-funciona .section-tag {
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

body.dark-mode #como-funciona .section-tag {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.process-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 48px;
  position: relative;
}

/* Card de Passo: Sem traço grosso de desenho, sem sombra dura offset */
.step-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 24px -4px rgba(15, 23, 42, 0.07);
  padding: 34px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

body.dark-mode .step-card {
  background-color: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 35px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06);
  border-color: rgba(37, 99, 235, 0.3);
}

body.dark-mode .step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -6px rgba(0, 0, 0, 0.7), 0 0 24px rgba(37, 99, 235, 0.15);
  border-color: rgba(96, 165, 250, 0.4);
}

/* Número do Passo (Círculo Flutuante Elegante) */
.step-badge {
  position: absolute;
  top: -12px;
  right: 22px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #0B192C;
  border: 2px solid #FFFFFF;
  box-shadow: 0 4px 12px rgba(11, 25, 44, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 900;
  color: #FFFFFF;
}

body.dark-mode .step-badge {
  background: #1E293B;
  color: #60A5FA;
  border-color: #0F172A;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
}

.step-icon-header {
  margin-bottom: 18px;
}

/* Pílula do Passo */
.step-label-top {
  display: inline-flex;
  align-items: center;
  background: rgba(37, 99, 235, 0.08);
  color: #2563EB;
  border: 1px solid rgba(37, 99, 235, 0.2);
  padding: 5px 14px;
  border-radius: 100px;
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

body.dark-mode .step-label-top {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border-color: rgba(96, 165, 250, 0.25);
}

.step-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 12px;
  line-height: 1.3;
}

body.dark-mode .step-title {
  color: #FFFFFF;
}

.step-text {
  font-size: 0.92rem;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 22px;
  flex-grow: 1;
}

body.dark-mode .step-text {
  color: #94A3B8;
}

.step-footer {
  padding-top: 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  font-size: 0.84rem;
  font-weight: 700;
  color: #2563EB;
}

body.dark-mode .step-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
  color: #60A5FA;
}

/* Banner CTA do Processo: Estilo Moderno e Fluido */
.process-cta-banner {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.08);
  padding: 34px 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

body.dark-mode .process-cta-banner {
  background-color: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 40px -6px rgba(0, 0, 0, 0.6);
}

.cta-banner-content h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 6px;
}

body.dark-mode .cta-banner-content h3 {
  color: #FFFFFF;
}

.cta-banner-content p {
  font-size: 0.92rem;
  color: #64748B;
}

body.dark-mode .cta-banner-content p {
  color: #94A3B8;
}

/* Botão WhatsApp dentro do banner sem sombra dura de desenho */
.process-cta-banner .btn-whatsapp {
  border: none !important;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35) !important;
  border-radius: 100px;
}

.process-cta-banner .btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.45) !important;
}

/* Botão de Fechar / Ocultar Painel no Estilo Pílula Tech */
.btn-hide-sphere-panel {
  background: #0B192C;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  padding: 10px 22px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
}

body.dark-mode .btn-hide-sphere-panel {
  background: #1E293B;
  border-color: rgba(255, 255, 255, 0.15);
  color: #F8FAFC;
}

.btn-hide-sphere-panel:hover {
  background: #EF4444;
  color: #FFFFFF;
  border-color: #EF4444;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
}
`;

// Replace lines from .process-section to .faq-section in styles.css
const procStart = css.indexOf('/* ================= 6. COMO FUNCIONA ================= */');
const procEnd = css.indexOf('/* ================= FAQ ================= */', procStart);

console.log('procStart:', procStart, 'procEnd:', procEnd);

if (procStart !== -1 && procEnd !== -1) {
  css = css.slice(0, procStart) + processCss.trim() + '\n\n' + css.slice(procEnd);
} else {
  console.log('Could not find process section bounds');
}

// Also update dark mode overrides for step-card and process-cta-banner
css = css.replace(/body\.dark-mode \.step-card\s*\{[\s\S]*?body\.dark-mode \.cta-banner-content p\s*\{[\s\S]*?\}/g, '/* Dark mode step-card handled in process block */');

// Also modernize .pricing-card and .pricing-consult-box to remove cartoon borders
css = css.replace(
  /\.pricing-card\s*\{[\s\S]*?padding: 44px 30px;/g,
  `.pricing-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 28px -4px rgba(15, 23, 42, 0.08);
  padding: 44px 30px;`
);

css = css.replace(
  /body\.dark-mode \.pricing-card\s*\{[\s\S]*?box-shadow: 6px 6px 0px #030407;/g,
  `body.dark-mode .pricing-card {
  background-color: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 36px -6px rgba(0, 0, 0, 0.6);`
);

css = css.replace(
  /\.pricing-consult-box\s*\{[\s\S]*?box-shadow: var\(--shadow-neo\);/g,
  `.pricing-consult-box {
  margin-top: 40px;
  background: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.08);`
);

css = css.replace(
  /body\.dark-mode \.pricing-consult-box\s*\{[\s\S]*?box-shadow: 4px 4px 0px #030712;/g,
  `body.dark-mode .pricing-consult-box {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 36px -6px rgba(0, 0, 0, 0.6);`
);

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Successfully updated styles.css for Como Funciona & Preço!');
