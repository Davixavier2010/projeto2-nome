const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function printBlock(startPattern, endPattern) {
  const start = html.indexOf(startPattern);
  if (start === -1) {
    console.log('Pattern not found:', startPattern);
    return;
  }
  const end = html.indexOf(endPattern, start);
  console.log('----------------------------------------------------');
  console.log(html.substring(start, end + endPattern.length));
}

console.log('=== PROBLEMA ===');
printBlock('<section class="section problem-section" id="problema">', '</section>');

console.log('=== PROMESSA ===');
printBlock('<section class="section benefits-section" id="promessa">', '</section>');

console.log('=== PRECO ===');
printBlock('<section class="section pricing-section sphere-panel" id="preco"', '</section>');

console.log('=== CONTATO / FOOTER ===');
printBlock('<footer class="site-footer"', '</footer>');
