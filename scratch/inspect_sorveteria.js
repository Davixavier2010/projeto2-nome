const https = require('https');

https.get('https://rida-sorveteria.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const title = data.match(/<title>([\s\S]*?)<\/title>/i);
    console.log('Title:', title ? title[1] : 'No title');
    const desc = data.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    console.log('Description:', desc ? desc[1] : 'No desc');
    
    // Look for brand name / h1
    const h1s = [...data.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    console.log('H1s:', h1s);
    
    const h2s = [...data.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 5);
    console.log('H2s:', h2s);
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
});
