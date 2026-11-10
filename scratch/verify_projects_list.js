const fs = require('fs');

const js = fs.readFileSync('script.js', 'utf8');
const match = js.match(/const projects = \[([\s\S]*?)\];/);
if (match) {
  const projects = eval(`[${match[1]}]`);
  console.log(`Total projects in Mathias gallery: ${projects.length}`);
  projects.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.plan.toUpperCase()}] ${p.name} -> ${p.url}`);
  });
} else {
  console.log('projects array not found');
}
