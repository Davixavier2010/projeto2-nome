const http = require('http');

http.get('http://localhost:3000/styles.css?v=7.0', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Includes new step-card style:', data.includes('Card de Passo: Sem traço grosso de desenho'));
    console.log('Includes old var(--shadow-neo) in step-card:', data.includes('.step-card {\n  background-color: var(--bg-cream-card);\n  border: var(--border-black-thick);'));
    console.log('Includes modern pricing-card:', data.includes('box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 28px -4px'));
  });
});
