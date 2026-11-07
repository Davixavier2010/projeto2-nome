const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const contactListIdx = html.indexOf('class="contact-list"');
console.log(html.slice(contactListIdx, contactListIdx + 1200));
