const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('348,50') || line.includes('Nossos Projetos') || line.includes('697') || line.includes('797') || line.includes('Mais Informações') || line.includes('Como Funciona') || line.includes('Bate-papo') || line.includes('15 a 25')) {
    console.log(`${idx+1}: ${line.trim()}`);
  }
});

