const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

// Find boundaries of #preco
const startPrecoMarker = '<!-- ================= 2. NOSSOS PLANOS (A OFERTA) ================= -->';
const endPrecoMarker = '<!-- ================= 3. O PORTFÓLIO (A VITRINE) ================= -->';

const idxPrecoStart = content.indexOf(startPrecoMarker);
const idxPrecoEnd = content.indexOf(endPrecoMarker);

if (idxPrecoStart === -1 || idxPrecoEnd === -1) {
  throw new Error('Could not find preco boundaries');
}

const precoSection = content.substring(idxPrecoStart, idxPrecoEnd).trim();

// Find boundaries of #portfolio
const startPortMarker = '<!-- ================= 3. O PORTFÓLIO (A VITRINE) ================= -->';
const endPortMarker = '<!-- ================= 4. A NOSSA PROMESSA (OS BENEFÍCIOS) ================= -->';

const idxPortStart = content.indexOf(startPortMarker);
const idxPortEnd = content.indexOf(endPortMarker);

if (idxPortStart === -1 || idxPortEnd === -1) {
  throw new Error('Could not find portfolio boundaries');
}

const portSection = content.substring(idxPortStart, idxPortEnd).trim();

// Update comments/labels
const updatedPortSection = portSection.replace(
  '<!-- ================= 3. O PORTFÓLIO (A VITRINE) ================= -->',
  '<!-- ================= 2. O PORTFÓLIO (A VITRINE) ================= -->'
);

const updatedPrecoSection = precoSection.replace(
  '<!-- ================= 2. NOSSOS PLANOS (A OFERTA) ================= -->',
  '<!-- ================= 3. NOSSOS PLANOS (A OFERTA) ================= -->'
);

// We replace the entire combined range [idxPrecoStart, idxPortEnd] with:
// updatedPortSection + updatedPrecoSection
const combinedReplacement = updatedPortSection + '\n\n    ' + updatedPrecoSection + '\n\n    ';

let newContent = content.substring(0, idxPrecoStart) + combinedReplacement + content.substring(idxPortEnd);

fs.writeFileSync(indexPath, newContent, 'utf-8');
console.log('✓ Successfully moved #portfolio directly after #inicio!');
