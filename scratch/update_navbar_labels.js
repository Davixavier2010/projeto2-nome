const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update top navbar
html = html.replace(
  '<ul class="nav-list">\n          <li><a href="#portfolio" class="nav-link">Nossos Projetos</a></li>\n          <li><a href="#preco" class="nav-link">Planos &amp; Preços</a></li>\n          <li><a href="#como-funciona" class="nav-link">Como Funciona</a></li>\n          <li><a href="#mais-informacoes" class="nav-link">Mais Informações</a></li>\n          <li><a href="#contato" class="nav-link">Contato</a></li>',
  '<ul class="nav-list">\n          <li><a href="#portfolio" class="nav-link">Projetos</a></li>\n          <li><a href="#preco" class="nav-link">Preços</a></li>\n          <li><a href="#como-funciona" class="nav-link">Começando</a></li>\n          <li><a href="#mais-informacoes" class="nav-link">Informações</a></li>\n          <li><a href="#contato" class="nav-link">Contato</a></li>'
);

// Fallback replace if exact whitespace differed
html = html.replace('>Nossos Projetos</a></li>', '>Projetos</a></li>');
html = html.replace('>Planos &amp; Preços</a></li>', '>Preços</a></li>');
html = html.replace('>Como Funciona</a></li>', '>Começando</a></li>');
html = html.replace('>Mais Informações</a></li>', '>Informações</a></li>');

// 2. Update Spheres labels
html = html.replace('<span class="orb-label">Área de Preço</span>', '<span class="orb-label">Preços</span>');
html = html.replace('<span class="orb-label">Como Funciona</span>', '<span class="orb-label">Começando</span>');

// 3. Update footer navigation links
html = html.replace(
  '<ul class="footer-links">\n            <li><a href="#inicio">Início</a></li>\n            <li><a href="#portfolio">Nossos Projetos</a></li>\n            <li><a href="#preco">Nossos Planos</a></li>\n            <li><a href="#promessa">Diferenciais</a></li>\n            <li><a href="#problema">O Problema</a></li>\n            <li><a href="#como-funciona">Como Funciona</a></li>\n          </ul>',
  '<ul class="footer-links">\n            <li><a href="#inicio">Início</a></li>\n            <li><a href="#portfolio">Projetos</a></li>\n            <li><a href="#preco">Preços</a></li>\n            <li><a href="#como-funciona">Começando</a></li>\n            <li><a href="#mais-informacoes">Informações</a></li>\n            <li><a href="#contato">Contato</a></li>\n          </ul>'
);

// 4. Bump version to 3.6
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=3.6');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=3.6');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated navbar and footer labels to: Projetos, Preços, Começando, Informações, Contato!');

