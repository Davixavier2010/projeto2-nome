const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<strong>Indicação:</strong> Pequenos negócios que precisam de uma presença profissional na internet, com um site de página única (One Page), apresentação da empresa, serviços, localização e contato.',
  '<strong>Indicado para:</strong> Pequenos negócios que precisam de uma presença profissional na internet, com um site de página única (One Page), apresentação da empresa, serviços, localização e contato.'
);

html = html.replace(
  '<strong>Indicação:</strong> Empresas que precisam de uma apresentação mais completa, com múltiplas seções, catálogo ou portfólio organizado e estrutura visual mais personalizada.',
  '<strong>Indicado para:</strong> Empresas que precisam de uma apresentação mais completa, com múltiplas seções, catálogo ou portfólio organizado e estrutura visual mais personalizada.'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated Indicado para labels.');
