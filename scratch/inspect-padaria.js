const fs = require('fs');
const html = fs.readFileSync('scratch/padaria.html', 'utf8');

// Find all image URLs and context
const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('<img') || line.includes('unsplash.com') || line.includes('background') || line.includes('url(')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
});

