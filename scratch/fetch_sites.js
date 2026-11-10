const https = require('https');

function fetchTitle(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
        const h1Match = data.match(/<h1[^>]*>([^<]*)<\/h1>/i);
        resolve({
          url,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1].trim() : null,
          h1: h1Match ? h1Match[1].trim() : null,
          sample: data.substring(0, 1000)
        });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function run() {
  const r1 = await fetchTitle('https://rida-cafeteria.vercel.app/');
  console.log('Cafeteria:', JSON.stringify(r1, null, 2));
  const r2 = await fetchTitle('https://rida-tenis.vercel.app/');
  console.log('Tenis:', JSON.stringify(r2, null, 2));
}

run();
