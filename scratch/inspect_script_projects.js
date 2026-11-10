const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const matches = js.match(/(?:const|let|var)\s+([a-zA-Z0-9_]*projects?[a-zA-Z0-9_]*)\s*=/gi);
console.log('Project matches in script.js:', matches);

// Search for mathias gallery data
const mathiasIdx = js.indexOf('mathias');
console.log('Mathias index in script.js:', mathiasIdx);

// Also search for URLs like academiarida or doceriarida
const urls = js.match(/https?:\/\/[^\s"',]+/g);
console.log('URLs in script.js:', urls);
