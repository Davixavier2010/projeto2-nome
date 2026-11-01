const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

// Find boundaries of #problema
const startProbMarker = '<!-- ================= 2. O PROBLEMA (AGITANDO A DOR) ================= -->';
const endProbMarker = '<!-- ================= 3. O PORTFÓLIO (A VITRINE) ================= -->';

const idxProbStart = content.indexOf(startProbMarker);
const idxProbEnd = content.indexOf(endProbMarker);

if (idxProbStart === -1 || idxProbEnd === -1) {
  throw new Error('Could not find problema boundaries');
}

const problemaSection = content.substring(idxProbStart, idxProbEnd).trim();

// Find boundaries of #preco
const startPrecoMarker = '<!-- ================= 5. PREÇO E TRANSPARÊNCIA (A OFERTA) ================= -->';
const endPrecoMarker = '<!-- ================= 6. COMO FUNCIONA (O PROCESSO) ================= -->';

const idxPrecoStart = content.indexOf(startPrecoMarker);
const idxPrecoEnd = content.indexOf(endPrecoMarker);

if (idxPrecoStart === -1 || idxPrecoEnd === -1) {
  throw new Error('Could not find preco boundaries');
}

const precoSection = content.substring(idxPrecoStart, idxPrecoEnd).trim();

// Updated comments
const updatedPrecoSection = precoSection.replace(
  '<!-- ================= 5. PREÇO E TRANSPARÊNCIA (A OFERTA) ================= -->',
  '<!-- ================= 2. NOSSOS PLANOS (A OFERTA) ================= -->'
);

const updatedProblemaSection = problemaSection.replace(
  '<!-- ================= 2. O PROBLEMA (AGITANDO A DOR) ================= -->',
  '<!-- ================= 5. A REALIDADE DO MERCADO (O PROBLEMA) ================= -->'
);

// We replace in order from bottom to top so indices don't shift
// 1. Replace preco with updated problema
let newContent = content.substring(0, idxPrecoStart) + updatedProblemaSection + '\n\n    ' + content.substring(idxPrecoEnd);

// 2. Replace problema with updated preco
newContent = newContent.substring(0, idxProbStart) + updatedPrecoSection + '\n\n    ' + newContent.substring(idxProbEnd);

fs.writeFileSync(indexPath, newContent, 'utf-8');
console.log('✓ Successfully swapped sections #preco and #problema in index.html!');

