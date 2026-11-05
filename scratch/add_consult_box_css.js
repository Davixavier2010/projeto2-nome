const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const consultBoxCss = `
/* ==============================================================================
   BANNER DE CONSULTORIA FINAL NA SEÇÃO DE PREÇOS
   ============================================================================== */
.pricing-consult-box {
  margin-top: 40px;
  background: var(--bg-cream-card);
  border: var(--border-black);
  border-radius: 20px;
  box-shadow: var(--shadow-neo);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  transition: all 0.25s ease;
}

body.dark-mode .pricing-consult-box {
  background: #151b26;
  border-color: #283344;
  box-shadow: 4px 4px 0px #030712;
}

.consult-box-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--navy-primary);
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

body.dark-mode .consult-box-title {
  color: #F8FAFC;
}

.consult-box-desc {
  font-size: 0.98rem;
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.45;
}

body.dark-mode .consult-box-desc {
  color: #94A3B8;
}
`;

css += '\n' + consultBoxCss;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended pricing-consult-box CSS to styles.css!');

