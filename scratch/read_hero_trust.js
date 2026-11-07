const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const heroActionsIdx = html.indexOf('class="hero-actions"');
console.log(html.slice(heroActionsIdx, heroActionsIdx + 1400));
