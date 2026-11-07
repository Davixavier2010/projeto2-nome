const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const checks = [
  'step-badge',
  'step-label-top',
  'step-card',
  'step-footer',
  'pricing-card',
  'price-block',
  'pricing-divider',
  'includes-list li',
  'whatsapp-tooltip',
  'floating-whatsapp-btn'
];

checks.forEach(c => {
  const count = (css.match(new RegExp(c, 'g')) || []).length;
  console.log(c, 'count:', count);
});
