const fs = require('fs');

// We have jimp or canvas? No, but we can check if sharp, jimp, canvas or simple node buffer processing is possible
// Let's inspect installed packages in package.json if any
let pkg = {};
try { pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); } catch(e){}
console.log('Dependencies:', pkg.dependencies, pkg.devDependencies);
