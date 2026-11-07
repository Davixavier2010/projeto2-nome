const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function extractSection(startTag, endTag) {
  const start = html.indexOf(startTag);
  if (start === -1) return 'NOT FOUND: ' + startTag;
  const end = html.indexOf(endTag, start);
  return html.substring(start, end + endTag.length);
}

console.log('=== 1. HERO ===');
const hero = extractSection('<section class="hero"', '</section>');
console.log(hero.substring(0, 1500));

console.log('=== 2. PROBLEMA (PRESENÇA DIGITAL) ===');
const problema = extractSection('id="painel-problema"', '</div>\n      </div>\n    </div>');
console.log(problema.substring(0, 1500));

console.log('=== 3. PROMESSA (DIFERENCIAIS) ===');
const promessa = extractSection('id="painel-promessa"', '</div>\n      </div>\n    </div>');
console.log(promessa.substring(0, 1500));
