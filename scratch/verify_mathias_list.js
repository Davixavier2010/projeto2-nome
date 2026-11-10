const fs = require('fs');

// Let's inspect the mathiasProjects array in script.js to verify all 9 projects
const js = fs.readFileSync('script.js', 'utf8');
const match = js.match(/const mathiasProjects = \[([\s\S]*?)\];/);
if (match) {
  const projects = eval(`[${match[1]}]`);
  console.log(`Found ${projects.length} projects in mathiasProjects:`);
  projects.forEach((p, i) => {
    console.log(`${i + 1}. [${p.id}] ${p.name} | Plano: ${p.plan} | URL: ${p.url}`);
  });
} else {
  console.log('mathiasProjects not found');
}
