const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('Includes <section class="section benefits-section" id="promessa">:', html.includes('<section class="section benefits-section" id="promessa">'));
const idx = html.indexOf('id="promessa"');
console.log('Index of id="promessa":', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 50, idx + 100));
}
