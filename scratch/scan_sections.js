const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// List section IDs and landmarks
const regex = /<(section|div|footer|header)[^>]*(id="[^"]+"|class="[^"]*section[^"]*")[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[0].slice(0, 100));
}
