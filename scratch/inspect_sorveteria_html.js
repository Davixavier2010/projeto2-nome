const https = require('https');

https.get('https://rida-sorveteria.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // print first 1500 chars and some structural tags
    console.log('LENGTH:', data.length);
    console.log('HEAD/BODY PREVIEW:\n', data.slice(0, 1000));
    // check sections or nav links
    const navLinks = [...data.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
      href: m[1],
      text: m[2].replace(/<[^>]+>/g, '').trim()
    }));
    console.log('NAV/LINKS:', navLinks.slice(0, 15));
  });
});
