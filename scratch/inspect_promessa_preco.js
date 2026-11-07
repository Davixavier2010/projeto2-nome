const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function printExact(id) {
  const start = html.indexOf(`id="${id}"`);
  const tagStart = html.lastIndexOf('<', start);
  const end = html.indexOf('</section>', start);
  console.log('=== ' + id + ' ===');
  console.log(html.substring(tagStart, end + 10));
}

printExact('promessa');
printExact('preco');
