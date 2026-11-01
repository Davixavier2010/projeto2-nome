const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function findSection(id) {
  const startTag = `<section class="` ;
  const idAttr = `id="${id}"`;
  const idx = html.indexOf(idAttr);
  if (idx === -1) {
    console.error('Not found:', id);
    return null;
  }
  const secStart = html.lastIndexOf('<section', idx);
  // find closing </section>
  let secEnd = html.indexOf('</section>', idx);
  if (secEnd !== -1) {
    secEnd += '</section>'.length;
  }
  return { id, start: secStart, end: secEnd, len: secEnd - secStart };
}

['inicio', 'portfolio', 'preco', 'promessa', 'problema', 'como-funciona', 'faq'].forEach(id => {
  const info = findSection(id);
  console.log(id, info ? { start: info.start, end: info.end, len: info.len } : 'null');
});

