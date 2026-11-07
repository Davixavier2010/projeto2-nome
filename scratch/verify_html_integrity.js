const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check key IDs
const ids = [
  'inicio',
  'portfolio',
  'preco',
  'como-funciona',
  'mais-informacoes',
  'panel-promessa',
  'promessa',
  'panel-problema',
  'problema',
  'panel-faq',
  'faq',
  'contato'
];

ids.forEach(id => {
  console.log(`ID check: #${id} ->`, html.includes(`id="${id}"`));
});

// Check key phrases
const checks = [
  'Sites profissionais com <span class="highlight-title">clientes no WhatsApp</span>.',
  'Tenha um site profissional para apresentar seu negócio e facilitar o contato com novos clientes.',
  'Até 5 dias úteis após o recebimento de todas as informações e materiais necessários.',
  'Indicado para:</strong> Pequenos negócios que precisam de uma presença profissional na internet',
  'Indicado para:</strong> Empresas que precisam de uma apresentação mais completa',
  'R$ 497',
  'R$ 47',
  'R$ 797',
  'R$ 77',
  'Pensado Primeiro para o Celular',
  'Soluções digitais pensadas para facilitar o contato com seus clientes',
  'O papel das redes sociais e do site próprio',
  'Instagram e outras redes sociais são ótimas ferramentas para divulgar seu negócio',
  'Comercial Principal',
  '(12) 97407-0207',
  '(19) 99911-8817',
  'rida.xv10@gmail.com'
];

console.log('\n--- Phrase Checks ---');
checks.forEach(c => {
  console.log(`Check: "${c.substring(0, 40)}..." ->`, html.includes(c));
});
