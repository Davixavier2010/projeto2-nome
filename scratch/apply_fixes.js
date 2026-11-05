const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update FAQ prices
html = html.replace(
  'ou R$ 348,50 no Plano Personalizado',
  'ou R$ 398,50 no Plano Personalizado'
);
html = html.replace(
  'ou R$ 67/mês no Plano Personalizado',
  'ou R$ 77/mês no Plano Personalizado'
);

// 2. Uniformize "Nossos Projetos" to "Projetos"
html = html.replace(
  '<h2 class="section-title">Nossos Projetos</h2>',
  '<h2 class="section-title">Projetos</h2>'
);
html = html.replace(
  '<span class="mathias-btn-title">Ver Nossos Projetos</span>',
  '<span class="mathias-btn-title">Ver Projetos</span>'
);

// 3. Update footer links to match exactly the navigation
html = html.replace(
  '<li><a href="#preco">Nossos Planos</a></li>',
  '<li><a href="#preco">Preços</a></li>'
);

// 4. Bump cache tags to v=4.0
html = html.replace('styles.css?v=3.8', 'styles.css?v=4.0');
html = html.replace('script.js?v=3.8', 'script.js?v=4.0');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html!');

