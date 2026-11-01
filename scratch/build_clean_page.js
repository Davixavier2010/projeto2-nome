const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Helper to extract section by id
function extractSection(id) {
  const idAttr = `id="${id}"`;
  const idx = html.indexOf(idAttr);
  if (idx === -1) throw new Error('Not found: ' + id);
  const secStart = html.lastIndexOf('<section', idx);
  let secEnd = html.indexOf('</section>', idx);
  secEnd += '</section>'.length;
  return html.substring(secStart, secEnd);
}

const secInicio = extractSection('inicio');
const secPortfolio = extractSection('portfolio');
const secPreco = extractSection('preco');
const secPromessa = extractSection('promessa');
const secProblema = extractSection('problema');
const secComoFunciona = extractSection('como-funciona');
const secFaq = extractSection('faq');

console.log('Successfully extracted all sections!');

