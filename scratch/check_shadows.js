const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const precoIdx = css.indexOf('/* ================= 5. PREÇOS');
const comoIdx = css.indexOf('/* ================= 6. COMO FUNCIONA');
const faqIdx = css.indexOf('/* ================= FAQ ================= */');

const sectionSlice = css.slice(precoIdx, faqIdx);
console.log('Includes var(--shadow-neo) in preco/como:', sectionSlice.includes('var(--shadow-neo)'));
console.log('Includes var(--border-black) in preco/como:', sectionSlice.includes('var(--border-black)'));
console.log('Includes 4px 4px 0px in preco/como:', sectionSlice.includes('4px 4px 0px'));
