const fs = require('fs');
const lines = fs.readFileSync('C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
const found = new Set();
for (let l of lines) {
  let s = JSON.parse(l);
  if (s.content && s.source === 'MODEL') {
    const urls = s.content.match(/https?:\/\/[^\s\)\*\"]+/g);
    if (urls) urls.forEach(u => found.add(u));
  }
}
console.log('URLs sent to user:');
console.log(Array.from(found));
