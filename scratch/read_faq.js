const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const faqIdx = html.indexOf('id="faq"');
const faqEnd = html.indexOf('</section>', faqIdx);
console.log(html.slice(faqIdx, faqEnd + 10));
