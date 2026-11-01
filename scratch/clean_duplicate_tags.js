const fs = require('fs');

// Read current index.html
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove duplicate closing tags after hero section (lines 247-250)
const duplicateTagPattern = `    </section>\r?\n          </div>\r?\n        </div>\r?\n      </div>\r?\n    </section>`;
if (html.match(new RegExp(duplicateTagPattern))) {
  html = html.replace(new RegExp(duplicateTagPattern), `    </section>`);
  console.log('Removed duplicate hero closing tags');
} else {
  // alternative replace
  html = html.replace(/<\/section>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>\s*<!-- ================= 2\. O PORTFÓLIO/g, '</section>\n\n    <!-- ================= 2. O PORTFÓLIO');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Cleaned hero duplicate tags');

