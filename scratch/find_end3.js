const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const extraHubStart = css.indexOf('.extra-hub-section {');
console.log(css.slice(extraHubStart + 4300, extraHubStart + 5500));
