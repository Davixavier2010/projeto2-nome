const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update .compare-card
const oldCompareCard = `.compare-card {
  background-color: var(--bg-cream-card);
  border: var(--border-black-thick);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-neo);
  padding: 32px;
  transition: var(--transition);
}

.compare-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-neo-hover);
}`;

const newCompareCard = `.compare-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 24px -4px rgba(15, 23, 42, 0.07);
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.compare-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -4px rgba(15, 23, 42, 0.12);
  border-color: rgba(37, 99, 235, 0.25);
}

body.dark-mode .compare-card {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
}

body.dark-mode .compare-card:hover {
  box-shadow: 0 20px 40px -6px rgba(0, 0, 0, 0.7), 0 0 24px rgba(37, 99, 235, 0.15);
  border-color: rgba(96, 165, 250, 0.4);
}`;

if (css.includes(oldCompareCard)) {
  css = css.replace(oldCompareCard, newCompareCard);
  console.log('Updated .compare-card');
} else {
  console.log('.compare-card old block not matched exactly, will check manual replace');
}

// 2. Update .problem-footer-cta
const oldProblemFooterCta = `.problem-footer-cta {
  background-color: var(--bg-cream-card);
  border: var(--border-black-thick);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-neo);
  padding: 28px;
  max-width: 640px;
  margin: 0 auto;
}`;

const newProblemFooterCta = `.problem-footer-cta {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 24px -4px rgba(15, 23, 42, 0.07);
  padding: 32px 28px;
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

body.dark-mode .problem-footer-cta {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
}`;

if (css.includes(oldProblemFooterCta)) {
  css = css.replace(oldProblemFooterCta, newProblemFooterCta);
  console.log('Updated .problem-footer-cta');
} else {
  console.log('.problem-footer-cta not matched');
}

// 3. Update .benefit-card
const oldBenefitCard = `.benefit-card {
  background-color: var(--bg-cream-card);
  border: var(--border-black-thick);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-neo);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  position: relative;
}

.benefit-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-neo-hover);
}`;

const newBenefitCard = `.benefit-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 24px -4px rgba(15, 23, 42, 0.07);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -4px rgba(15, 23, 42, 0.12);
  border-color: rgba(37, 99, 235, 0.25);
}

body.dark-mode .benefit-card {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
}

body.dark-mode .benefit-card:hover {
  box-shadow: 0 20px 40px -6px rgba(0, 0, 0, 0.7), 0 0 24px rgba(37, 99, 235, 0.15);
  border-color: rgba(96, 165, 250, 0.4);
}`;

if (css.includes(oldBenefitCard)) {
  css = css.replace(oldBenefitCard, newBenefitCard);
  console.log('Updated .benefit-card');
} else {
  console.log('.benefit-card not matched');
}

// 4. Update .faq-item
const oldFaqItem = `.faq-item {
  background-color: var(--bg-cream-card);
  border: var(--border-black-thick);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-neo-sm);
  transition: var(--transition);
  overflow: hidden;
}`;

const newFaqItem = `.faq-item {
  background-color: #FFFFFF;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.05);
  transition: all 0.25s ease;
  overflow: hidden;
  margin-bottom: 12px;
}

.faq-item:hover {
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 6px 16px -3px rgba(15, 23, 42, 0.08);
}

.faq-item[open] {
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.08);
}

body.dark-mode .faq-item {
  background-color: #0F172A;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

body.dark-mode .faq-item[open] {
  border-color: rgba(96, 165, 250, 0.35);
}`;

if (css.includes(oldFaqItem)) {
  css = css.replace(oldFaqItem, newFaqItem);
  console.log('Updated .faq-item');
} else {
  console.log('.faq-item not matched');
}

// 5. Add .plan-target-audience and .badge-primary-contact styling if not present
if (!css.includes('.plan-target-audience')) {
  css += `\n
/* ================= INDICAÇÃO DE PÚBLICO NOS PLANOS ================= */
.plan-target-audience {
  margin: 14px 0 20px 0;
  padding: 12px 16px;
  background-color: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.12);
  border-radius: 12px;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--navy-primary);
  text-align: left;
}

.plan-target-audience strong {
  display: block;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--blue-accent);
  margin-bottom: 4px;
}

body.dark-mode .plan-target-audience {
  background-color: rgba(37, 99, 235, 0.12);
  border-color: rgba(96, 165, 250, 0.2);
  color: #E2E8F0;
}

body.dark-mode .plan-target-audience strong {
  color: #93C5FD;
}

.badge-primary-contact {
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(37, 99, 235, 0.12);
  color: var(--blue-accent);
  padding: 2px 7px;
  border-radius: 6px;
  display: inline-block;
  letter-spacing: 0.02em;
}

body.dark-mode .badge-primary-contact {
  background: rgba(37, 99, 235, 0.25);
  color: #93C5FD;
}
`;
  console.log('Added .plan-target-audience and .badge-primary-contact styling');
}

fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css updated successfully.');
