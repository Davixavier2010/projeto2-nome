const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /https:\/\/[a-zA-Z0-9_-]+\.vercel\.app/g;
const matches = [...new Set(html.match(regex) || [])];
console.log('Vercel links in index.html:', matches);
