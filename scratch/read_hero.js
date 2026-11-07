const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const heroStart = html.indexOf('<div class="top-bar">');
const heroEnd = html.indexOf('<!-- ================= 2. VITRINE DE PROJETOS');
console.log(html.slice(heroStart, heroEnd));
