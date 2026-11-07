const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const targets = [
  'Presença oficial no Google e estrutura completa para seu negócio vender mais.',
  'Em poucos dias, apresentamos o seu site pronto, testado e funcionando.',
  'Pronto para transformar seu negócio em uma referência local?',
  'Um investimento que cabe no bolso do seu negócio.',
  'Para negócios que precisam de uma presença profissional na internet.',
  'Para empresas que precisam de uma apresentação mais completa.',
  'Não sabe qual plano escolher?',
  'Por que escolher a nossa agência?',
  '90% dos seus clientes vão acessar seu site pelo celular.',
  'Só ter redes sociais não é mais suficiente.',
  'Não deixe o seu faturamento na mão dos algoritmos.',
  'Respostas claras para você fechar com tranquilidade total.',
  'Ajudando negócios locais a crescerem.'
];

targets.forEach(t => {
  console.log(`Found: "${t}" ->`, html.includes(t));
});
