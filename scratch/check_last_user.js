const fs = require('fs');
const lines = fs.readFileSync('C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
const userInputs = lines
  .map(l => {
    try { return JSON.parse(l); } catch(e) { return null; }
  })
  .filter(obj => obj && obj.type === 'USER_INPUT');

const last = userInputs.slice(-2);
console.log(JSON.stringify(last, null, 2));
