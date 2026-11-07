const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// ==============================================================================
// 1. COMO FUNCIONA (PROCESS SECTION) - RESTORE MARCAS WITH MODERN TECH LOOK
// ==============================================================================
const modernProcessCss = `
/* ================= 6. COMO FUNCIONA (ESTILO MODERNO COM MARCAS PRESERVADAS) ================= */
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

/* Card de Passo Moderno */
.step-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 24px -4px rgba(15, 23, 42, 0.07);
  padding: 34px 28px 28px 28px;
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

/* Marca 1: Círculo Flutuante com o Número do Passo (1, 2, 3) */
.step-badge {
  position: absolute;
  top: -14px;
  right: 22px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #0B192C;
  border: 2px solid #FFFFFF;
  box-shadow: 0 4px 14px rgba(11, 25, 44, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 900;
  color: #FFFFFF;
  z-index: 2;
}

body.dark-mode .step-badge {
  background: #1E293B;
  color: #60A5FA;
  border-color: #0F172A;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
}

.step-icon-header {
  margin-bottom: 14px;
}

/* Marca 2: Pílula de Identificação do Passo (Passo 1, Passo 2, Passo 3) */
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

/* Marca 3: Divisória e Rodapé com Detalhes */
.step-footer {
  padding-top: 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  font-size: 0.84rem;
  font-weight: 700;
  color: #2563EB;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

body.dark-mode .step-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
  color: #60A5FA;
}

/* Banner CTA do Processo */
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

.process-cta-banner .btn-whatsapp {
  border: none !important;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35) !important;
  border-radius: 100px;
}

.process-cta-banner .btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.45) !important;
}

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

// Replace the Como Funciona block
const procStart = css.indexOf('/* ================= 6. COMO FUNCIONA');
const procEnd = css.indexOf('/* ================= FAQ ================= */', procStart);
if (procStart !== -1 && procEnd !== -1) {
  css = css.slice(0, procStart) + modernProcessCss.trim() + '\n\n' + css.slice(procEnd);
  console.log('Como Funciona CSS updated!');
} else {
  console.log('Could not find Como Funciona bounds');
}

// ==============================================================================
// 2. PRICING SECTION - REMOVE ALL CARTOON DRAWING BORDERS & HARD SHADOWS
// ==============================================================================
const modernPricingCss = `
/* ================= 5. PREÇOS (ESTILO MODERNO, CLEAN & CORPORATIVO - SEM SOMBRA PRETA DE DESENHO) ================= */
.pricing-section {
  background-color: transparent;
  padding: 88px 0;
  position: relative;
}

#preco .section-tag {
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

body.dark-mode #preco .section-tag {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.pricing-plans-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  align-items: stretch;
}

@media (max-width: 960px) {
  .pricing-plans-grid {
    grid-template-columns: 1fr;
    max-width: 580px;
  }
}

/* Card de Preço Moderno: Sem borda grossa preta, sem sombra offset preta */
.pricing-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 28px -4px rgba(15, 23, 42, 0.08);
  padding: 44px 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

body.dark-mode .pricing-card {
  background-color: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 36px -6px rgba(0, 0, 0, 0.6);
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px -6px rgba(15, 23, 42, 0.12);
}

body.dark-mode .pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 48px -6px rgba(0, 0, 0, 0.75);
}

/* Card Destaque (Plano Personalizado) */
.featured-pricing-card {
  border: 2px solid rgba(37, 99, 235, 0.35);
  box-shadow: 0 16px 40px -4px rgba(37, 99, 235, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06);
}

body.dark-mode .featured-pricing-card {
  border: 2px solid rgba(96, 165, 250, 0.35);
  box-shadow: 0 16px 44px -4px rgba(37, 99, 235, 0.25);
}

/* Pílula no Topo do Card */
.pricing-badge-popular {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0B192C;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 14px rgba(11, 25, 44, 0.25);
  padding: 6px 22px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

body.dark-mode .pricing-badge-popular {
  background-color: #1E293B;
  border-color: rgba(255, 255, 255, 0.12);
  color: #60A5FA;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.plan-header {
  margin-bottom: 24px;
  padding-top: 6px;
}

.plan-title {
  font-size: 1.85rem;
  font-weight: 900;
  color: #0F172A;
  margin-bottom: 8px;
}

body.dark-mode .plan-title {
  color: #FFFFFF;
}

.plan-desc {
  font-size: 0.92rem;
  color: #64748B;
  line-height: 1.5;
}

body.dark-mode .plan-desc {
  color: #94A3B8;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

body.dark-mode .pricing-grid {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

@media (max-width: 520px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .pricing-divider {
    margin: 0 auto;
  }
}

/* Blocos de Preço Internos (Setup e Mensalidade) */
.price-block {
  text-align: center;
  padding: 18px 14px;
  background-color: #F8FAFC;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

body.dark-mode .price-block {
  background-color: #131E33;
  border-color: rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}

.price-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

body.dark-mode .price-label {
  color: #93C5FD;
}

.price-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  margin-bottom: 8px;
}

.price-value .currency {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
}

body.dark-mode .price-value .currency {
  color: #FFFFFF;
}

.price-value .amount {
  font-size: 2.5rem;
  font-weight: 900;
  color: #0F172A;
  line-height: 1;
}

body.dark-mode .price-value .amount {
  color: #FFFFFF;
}

.price-value .cents {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
}

body.dark-mode .price-value .cents {
  color: #FFFFFF;
}

.price-value .period {
  font-size: 0.92rem;
  font-weight: 700;
  color: #64748B;
  margin-left: 2px;
}

body.dark-mode .price-value .period {
  color: #94A3B8;
}

.payment-terms {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge-terms {
  align-self: center;
  background-color: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.2);
  padding: 3px 12px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #2563EB;
}

body.dark-mode .badge-terms {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border-color: rgba(96, 165, 250, 0.25);
}

.payment-terms p {
  font-size: 0.78rem;
  color: #64748B;
  line-height: 1.35;
}

body.dark-mode .payment-terms p {
  color: #94A3B8;
}

.monthly-subtext {
  font-size: 0.78rem;
  color: #64748B;
  line-height: 1.35;
}

body.dark-mode .monthly-subtext {
  color: #94A3B8;
}

/* Divisor (+) central */
.pricing-divider {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #0B192C;
  border: 2px solid #FFFFFF;
  box-shadow: 0 2px 8px rgba(11, 25, 44, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 900;
  color: #FFFFFF;
}

body.dark-mode .pricing-divider {
  background-color: #1E293B;
  color: #60A5FA;
  border-color: #0F172A;
}

/* Recursos Inclusos */
.pricing-includes {
  padding: 24px 0 20px 0;
  flex-grow: 1;
}

.includes-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 14px;
  text-align: center;
}

body.dark-mode .includes-title {
  color: #FFFFFF;
}

.includes-plus-badge {
  display: inline-block;
  background-color: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.2);
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 0.74rem;
  font-weight: 800;
  color: #2563EB;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

body.dark-mode .includes-plus-badge {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border-color: rgba(96, 165, 250, 0.25);
}

.includes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Itens da lista de recursos: Cards individuais clean sem bordas grossas pretas */
.includes-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background-color: #F8FAFC;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 14px;
  transition: all 0.2s ease;
}

body.dark-mode .includes-list li {
  background-color: #131E33;
  border-color: rgba(255, 255, 255, 0.05);
}

.includes-list li:hover {
  background-color: #F1F5F9;
  border-color: rgba(37, 99, 235, 0.2);
}

body.dark-mode .includes-list li:hover {
  background-color: #17243C;
}

.check-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #0B192C;
  border: none;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 1px;
}

body.dark-mode .check-icon {
  background-color: #2563EB;
  color: #FFFFFF;
}

.include-desc strong {
  display: block;
  font-size: 0.92rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 2px;
}

body.dark-mode .include-desc strong {
  color: #F8FAFC;
}

.include-desc span {
  display: block;
  font-size: 0.82rem;
  color: #64748B;
  line-height: 1.4;
}

body.dark-mode .include-desc span {
  color: #94A3B8;
}

.pricing-actions {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pricing-actions .btn-whatsapp {
  border: none !important;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35) !important;
  border-radius: 100px;
}

.pricing-actions .btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(37, 211, 102, 0.45) !important;
}

.pricing-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #64748B;
  font-weight: 600;
}

body.dark-mode .pricing-guarantee {
  color: #94A3B8;
}

/* Banner de Consultoria ao Final de Preços */
.pricing-consult-box {
  margin-top: 44px;
  background: #FFFFFF;
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

body.dark-mode .pricing-consult-box {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 40px -6px rgba(0, 0, 0, 0.6);
}

.pricing-consult-box .consult-box-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 6px;
}

body.dark-mode .pricing-consult-box .consult-box-title {
  color: #FFFFFF;
}

.pricing-consult-box .consult-box-desc {
  font-size: 0.92rem;
  color: #64748B;
}

body.dark-mode .pricing-consult-box .consult-box-desc {
  color: #94A3B8;
}

.pricing-consult-box .btn-whatsapp {
  border: none !important;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35) !important;
  border-radius: 100px;
}

.pricing-consult-box .btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.45) !important;
}

/* ================= BOTÃO FLUTUANTE DO WHATSAPP (SEM SOMBRA PRETA DE DESENHO) ================= */
.whatsapp-tooltip {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px -2px rgba(15, 23, 42, 0.12);
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 0.84rem;
  font-weight: 800;
  color: #0F172A;
  white-space: nowrap;
  animation: pulseTooltip 3s infinite ease-in-out;
}

body.dark-mode .whatsapp-tooltip {
  background-color: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

.floating-whatsapp-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  border: none;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
}

body.dark-mode .floating-whatsapp-btn {
  box-shadow: 0 8px 26px rgba(37, 211, 102, 0.55);
}

.floating-whatsapp-btn:hover {
  background-color: #20BA5A;
  transform: scale(1.08);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
}

.floating-whatsapp-btn:active {
  transform: scale(0.96);
}
`;

// Replace the Pricing block in styles.css
const priceStart = css.indexOf('/* ================= 5. TABELA DE PREÇOS');
const priceEnd = css.indexOf('/* ================= 6. COMO FUNCIONA', priceStart);

console.log('priceStart:', priceStart, 'priceEnd:', priceEnd);

if (priceStart !== -1 && priceEnd !== -1) {
  css = css.slice(0, priceStart) + modernPricingCss.trim() + '\n\n' + css.slice(priceEnd);
  console.log('Pricing CSS updated!');
} else {
  console.log('Could not find Pricing bounds');
}

fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css written successfully!');
