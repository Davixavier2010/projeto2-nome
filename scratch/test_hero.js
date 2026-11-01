const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Check current hero section
console.log('Hero section preview:');
const heroStart = html.indexOf('id="inicio"');
console.log(html.substring(heroStart, heroStart + 500));

