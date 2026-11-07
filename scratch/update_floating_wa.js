const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Replace the old floating whatsapp button definition
const waOldDef = `.whatsapp-tooltip {
  background-color: var(--bg-cream-card);
  border: var(--border-black-thick);
  box-shadow: var(--shadow-neo);
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--navy-primary);
  white-space: nowrap;
  animation: pulseTooltip 3s infinite ease-in-out;
}

@keyframes pulseTooltip {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-4px); }
}

.floating-whatsapp-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--wa-green);
  border: var(--border-black-thick);
  box-shadow: var(--shadow-neo);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: var(--transition);
}

.floating-whatsapp-btn:hover {
  background-color: var(--wa-green-hover);
  transform: scale(1.08) translate(-2px, -2px);
  box-shadow: var(--shadow-neo-hover);
}

.floating-whatsapp-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--black-line);
}`;

const waNewDef = `.whatsapp-tooltip {
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

@keyframes pulseTooltip {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-4px); }
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
}`;

if (css.includes(waOldDef)) {
  css = css.replace(waOldDef, waNewDef);
  console.log('Floating WhatsApp button updated!');
} else {
  console.log('Exact waOldDef not found, searching index...');
  const idx = css.indexOf('.whatsapp-tooltip {');
  console.log(css.slice(idx, idx + 400));
}

fs.writeFileSync('styles.css', css, 'utf8');
