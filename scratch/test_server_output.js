const http = require('http');

http.get('http://localhost:3000/index.html', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Cache-Control:', res.headers['cache-control']);
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Includes 348,50 (should be false):', data.includes('348,50'));
    console.log('Includes 398,50 (should be true):', data.includes('398,50'));
    console.log('Includes 67/mês (should be false):', data.includes('67/mês'));
    console.log('Includes 77/mês (should be true):', data.includes('77/mês'));
    console.log('Includes 15 a 25 min (should be true):', data.includes('15 a 25 min'));
    console.log('Includes Nossos Projetos (should be false):', data.includes('Nossos Projetos'));
    console.log('Includes Nossos Planos (should be false):', data.includes('Nossos Planos'));
  });
});

