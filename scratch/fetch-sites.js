const fs = require('fs');

async function inspect(url, name) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    console.log(`=== ${name} (${url}) ===`);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'No title');
    
    // Look for og:image or screenshots or main images
    const ogImage = html.match(/property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    console.log('OG Image:', ogImage ? ogImage[1] : 'None');

    // All images
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('Images count:', imgMatches.length);
    console.log('Sample images:', imgMatches.slice(0, 8));

    // Save sample HTML snippet to analyze design
    fs.writeFileSync(`scratch/${name}.html`, html);
  } catch (err) {
    console.error('Error fetching', url, err);
  }
}

async function run() {
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');
  await inspect('https://padaria-prestigio.vercel.app/', 'padaria');
  await inspect('https://glacy-bistro.vercel.app/', 'bistro');
}

run();

