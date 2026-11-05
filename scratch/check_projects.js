const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const projectsIdx = js.indexOf('const projects = [');
if (projectsIdx !== -1) {
  const endIdx = js.indexOf('];', projectsIdx);
  console.log(js.slice(projectsIdx, endIdx + 2));
} else {
  console.log('projects array not found');
}

