const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sectionMatches = [...html.matchAll(/<(section|div)[^>]*id="([^"]+)"[^>]*>/g)];
sectionMatches.forEach(m => console.log(m[0]));
