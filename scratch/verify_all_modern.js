const http = require('http');

http.get('http://localhost:3000/styles.css?v=8.0', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Has step-badge style:', data.includes('.step-badge {'));
    console.log('Has step-label-top style:', data.includes('.step-label-top {'));
    console.log('Has step-footer style:', data.includes('.step-footer {'));
    console.log('Pricing-card modern style:', data.includes('box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 12px 28px -4px'));
    console.log('Price-block modern style:', data.includes('.price-block {\n  text-align: center;\n  padding: 18px 14px;'));
    console.log('Floating wa modern style:', data.includes('box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);'));
  });
});
