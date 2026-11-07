const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
const lines = css.split('\n');

const lineNumbers = [362, 421, 465, 639, 666, 792, 885, 2006, 3138, 3200];

lineNumbers.forEach(ln => {
  let context = '';
  for (let i = Math.max(0, ln - 15); i < Math.min(lines.length, ln + 5); i++) {
    context += `${i+1}: ${lines[i]}\n`;
  }
  console.log(`=== Line ${ln} ===\n` + context);
});
