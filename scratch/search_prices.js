const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

function searchMatches(pattern, text, filename) {
  const lines = text.split('\n');
  lines.forEach((line, idx) => {
    if (pattern.test(line)) {
      console.log(`${filename}:${idx + 1}: ${line.trim()}`);
    }
  });
}

console.log('--- Searching for 697, 67/mês, 348,50 ---');
searchMatches(/697|348[,.]50|67\/m[êe]s/i, html, 'index.html');
searchMatches(/697|348[,.]50|67\/m[êe]s/i, js, 'script.js');

