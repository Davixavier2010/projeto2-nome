const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const heroTrustIdx = html.indexOf('class="hero-trust-row"');
console.log(html.slice(heroTrustIdx, heroTrustIdx + 1200));
