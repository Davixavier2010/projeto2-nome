const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /<section[^>]*id="([^"]+)"[^>]*>/g;
let match;
console.log('Sections:');
while ((match = regex.exec(html)) !== null) {
  console.log(' - #' + match[1]);
}

