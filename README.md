# Rida - Criação de Sites para Negócios Locais

> Desenvolvido para **Davi Xavier** e **Ricardo Veríssimo**  
> Paleta visual: **Creme** (fundo), **Azul Marinho** (força & autoridade) e **Linhas em Preto** (editorial moderno).

---

## O Que Foi Criado

Um site completo, mobile-first, ultra rápido e de alta conversão para a **Rida**, pronto para atrair pequenos e médios comerciantes locais para o WhatsApp de vocês, sem uso de emojis e com a identidade visual oficial.

### Seções Incluídas:
1. **Cabeçalho (Hero Section):**
   - Título: *"O seu negócio precisa de uma 'casa própria' na internet."*
   - Subtítulo: *"Chega de morar de aluguel no Instagram..."*
   - Botão CTA: `Quero um site para meu negócio` (com ícone oficial do WhatsApp)
   - Mockup do smartphone no hero com selos do Google e WhatsApp.
2. **O Problema (Agitando a dor do cliente):**
   - Título: *"Só ter redes sociais não é mais suficiente."*
   - Comparativo visual lado a lado: *"Morar de aluguel no Instagram"* vs *"Sua Casa Própria no Google"*.
3. **O Portfólio (A Vitrine com Projetos Reais):**
   - 🥖 **Padaria Prestígio 1986** (https://padaria-prestigio.vercel.app/)
   - ☕ **Glacy • Café & Bistrô** (https://glacy-bistro.vercel.app/)
   - 🩺 **Modelo para Clínica / Oficina Especializada**
   - Botão para **ampliar e ver em tela cheia** (Modal interativo) e botão direto de **"Visitar Site ao Vivo"**.
   - Nota personalizada para outros ramos com tags (Petshops, Academias, Salões, etc.).
4. **A Nossa Promessa (Os Benefícios):**
   - **Focado no Celular** (90% dos acessos mobile).
   - **Direto ao Ponto** (Sem enrolação, foco em conversão).
   - **Suporte "Paz de Espírito"** (Alterações feitas pela agência via WhatsApp).
5. **Preço e Transparência (A Oferta):**
   - Setup: **R$ 497,00** (Pago em 2x: 50% de R$ 248,50 para iniciar e 50% de R$ 248,50 na entrega).
   - Manutenção: **R$ 47,00 / mês**.
   - Benefícios da mensalidade (Hospedagem 24h, Proteção Hacker/SSL, Suporte).
   - Botão: `Falar com a equipe no WhatsApp`.
6. **Como Funciona (O Processo em 3 Passos):**
   - Passo 1: Alinhamento
   - Passo 2: Você envia o material
   - Passo 3: Entrega Rápida
7. **Perguntas Frequentes (FAQ):**
   - Sanando as maiores dúvidas de donos de pequenos comércios.
8. **Rodapé (Footer):**
   - Logo oficial da **Rida**, e-mail oficial (`rida.xv10@gmail.com`), WhatsApp.
   - Nomes dos criadores: **Davi Xavier e Ricardo Veríssimo**.
   - Botão flutuante do WhatsApp sempre visível com mensagem personalizada.

---

## Como Personalizar Seus Dados

Abra o arquivo [`script.js`](./script.js) no seu editor de código. No topo do arquivo você encontrará o bloco:

```javascript
const SITE_CONFIG = {
  // 1. Nome da sua agência
  agencyName: "Rida",

  // 2. Seu WhatsApp com DDD (apenas números)
  // Exemplo: "5511999998888"
  whatsappNumber: "5512974070207",

  // 3. Mensagem padrão que o cliente vai mandar
  whatsappDefaultMessage: "Olá equipe da Rida! Gostaria de um site profissional para o meu comércio.",

  // 4. Seu e-mail de contato
  email: "rida.xv10@gmail.com",

  // 5. Nomes dos Fundadores
  founders: "Davi Xavier e Ricardo Veríssimo"
};
```

Ao alterar qualquer um desses valores no `script.js`, os botões e links de WhatsApp e E-mail de todo o site serão atualizados automaticamente!
