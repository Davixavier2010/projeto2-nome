const http = require('http');

http.get('http://localhost:3000/index.html', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Has site-brand-bg (should be false):', data.includes('site-brand-bg'));
    console.log('Has siteSplash (should be true):', data.includes('id="siteSplash"'));
    console.log('CSS version tag:', data.match(/styles\.css\?v=[0-9.]+/)[0]);
  });
});

