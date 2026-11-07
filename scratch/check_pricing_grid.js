const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const startGrid = html.indexOf('<div class="pricing-plans-grid">');
const endGrid = html.indexOf('<!-- Banner de Orientação no Final da Seção de Preços -->');
console.log(html.substring(startGrid, endGrid));
