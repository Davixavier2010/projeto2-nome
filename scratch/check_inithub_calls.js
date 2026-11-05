const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const calls = [];
const lines = js.split('\n');
lines.forEach((l, i) => {
  if (l.includes('initExtraHub')) {
    calls.push(`${i+1}: ${l.trim()}`);
  }
});
console.log('initExtraHub occurrences:');
console.log(calls.join('\n'));

