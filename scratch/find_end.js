const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const extraHubStart = css.indexOf('.extra-hub-section {');
console.log('Snippet from extraHubStart:');
console.log(css.slice(extraHubStart + 2000, extraHubStart + 2600));
