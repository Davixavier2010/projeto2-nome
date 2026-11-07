const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function showSection(id) {
  const start = html.indexOf(`id="${id}"`);
  if (start === -1) {
    console.log(`id="${id}" NOT FOUND`);
    return;
  }
  // Find opening tag
  const tagStart = html.lastIndexOf('<', start);
  // Find closing section tag or next section
  const nextSection = html.indexOf('</section>', start);
  console.log(`==================== SECTION: ${id} ====================`);
  console.log(html.substring(tagStart, nextSection + 10));
}

showSection('inicio');
showSection('problema');
showSection('promessa');
showSection('preco');
showSection('como-funciona');
showSection('faq');
