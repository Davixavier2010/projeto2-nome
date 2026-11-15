# 📋 Especificação e Código: Plano RIDA Pro (Site + Sistema)

> **Status:** Guardado para lançamento futuro (Backlog / Pronto para Ativação).  
> **Data de Criação:** Novembro de 2026.

---

## 💡 Proposta de Valor & Condições Comerciais

* **Nome Oficial:** Plano RIDA Pro (Site + Sistema)
* **Setup (Criação do Site + Sistema):** **R$ 1.097,00**
  * *Condição facilitada:* 50% na entrada (R$ 548,50) e 50% na entrega e liberação do sistema.
* **Manutenção & Sistema Mensal:** **R$ 197,00 / mês**
  * *Incluso:* Hospedagem em nuvem de alta capacidade, servidor dedicado ao sistema de agendamento, certificado SSL e suporte contínuo prioritário.
* **Público-Alvo / Indicado para:** Negócios e comércios que querem captação de clientes no automático 24h por dia: site de alto padrão com agendamento online, painel próprio protegido por senha e gestão de pedidos sem depender de atendimento manual.
* **Headline / Chamada:** *"Seu site agendando clientes no automático 24h por dia."*

---

## 🎯 Recursos e Benefícios Inclusos (Copy Oficial)

1. **Agendamento Online 24h:** Captação de clientes a qualquer hora do dia ou da noite, direto pelo site no automático.
2. **Painel no Próprio Site:** Área exclusiva protegida por login e senha para acompanhar pedidos e agendamentos.
3. **1 Clique no WhatsApp:** Confirmação de horário automática e contato direto com o cliente sem perda de tempo.
4. **Preços & Serviços Editáveis:** Altere valores e serviços com total facilidade no painel sem precisar mexer em código.
5. **Visual Rida de Alto Padrão:** Design sofisticado, exclusivo e responsivo para valorizar a imagem do seu comércio.
6. **Hospedagem & Manutenção Inclusas:** Servidores rápidos e estáveis, certificado SSL e suporte técnico prioritário contínuo.
7. **Prazo de Entrega Ágil:** Até 7 dias úteis com configuração completa e treinamento de uso do painel.

---

## 🔗 Link de WhatsApp com Mensagem Pronta

* **URL:**
  `https://wa.me/5519999118617?text=Ol%C3%A1!%20Gostaria%20de%20fechar%20o%20Plano%20RIDA%20Pro%20(Site%20%2B%20Sistema%20-%20Setup%20R$%201097%20%2B%20R$%20197/m%C3%AAs).`
* **data-text:**
  `Olá! Gostaria de fechar o Plano RIDA Pro (Site + Sistema - Setup R$ 1097 + R$ 197/mês).`

---

## 🧱 Código HTML Pronto para Ativação (Card de Preço)

Para ativar no site, basta colar o bloco abaixo dentro de `.pricing-plans-grid` em `index.html`:

```html
<!-- Plano 03: Plano RIDA Pro (Site + Sistema) -->
<div class="pricing-card pro-pricing-card">
  <div class="pricing-badge-popular badge-pro">Site + Sistema Pro</div>
  
  <div class="plan-header text-center">
    <h3 class="plan-title">Plano RIDA Pro</h3>
    <div class="plan-target-audience">
      <strong>Indicado para:</strong> Negócios que querem captação no automático: site de alto padrão com agendamento online 24h, painel exclusivo com senha e gestão descomplicada.
    </div>
  </div>

  <div class="pricing-grid">
    <!-- Setup Box -->
    <div class="price-block setup-block">
      <span class="price-label">Setup (Site + Sistema)</span>
      <div class="price-value">
        <span class="currency">R$</span>
        <span class="amount">1.097</span>
        <span class="cents">,00</span>
      </div>
      <div class="payment-terms">
        <span class="badge-terms">Condição Facilitada</span>
        <p>50% na entrada e 50% na entrega do sistema.</p>
      </div>
    </div>

    <!-- Plus Separator -->
    <div class="pricing-divider">
      <span>+</span>
    </div>

    <!-- Mensalidade Box -->
    <div class="price-block monthly-block">
      <span class="price-label">Manutenção &amp; Sistema</span>
      <div class="price-value">
        <span class="currency">R$</span>
        <span class="amount">197</span>
        <span class="cents">,00</span>
        <span class="period">/ mês</span>
      </div>
      <p class="monthly-subtext">Hospedagem inclusa, servidor dedicado ao sistema de agendamento e suporte contínuo.</p>
    </div>
  </div>

  <!-- Botão Ver o que está incluso no plano -->
  <div class="pricing-drawer-toggle-wrap">
    <button type="button" class="btn-toggle-includes js-toggle-includes" aria-expanded="false" aria-controls="includes-pro" id="btn-toggle-pro">
      <span class="toggle-btn-text">Ver o que está incluso no plano</span>
      <span class="toggle-btn-icon" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>
  </div>

  <!-- O que inclui? -->
  <div class="pricing-includes pricing-drawer-content" id="includes-pro" hidden>
    <div class="text-center" style="margin-bottom: 12px;">
      <span class="includes-plus-badge">Recursos Inclusos no Plano Pro</span>
      <h4 class="includes-title" style="margin-bottom: 0;">O que está incluso:</h4>
    </div>
    <ul class="includes-list">
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>Agendamento Online 24h</strong>
          <span>Captação de clientes a qualquer hora do dia ou da noite, direto pelo site no automático.</span>
        </div>
      </li>
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>Painel no Próprio Site</strong>
          <span>Área exclusiva protegida por login e senha para acompanhar pedidos e agendamentos.</span>
        </div>
      </li>
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>1 Clique no WhatsApp</strong>
          <span>Confirmação de horário automática e contato direto com o cliente sem perda de tempo.</span>
        </div>
      </li>
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>Preços &amp; Serviços Editáveis</strong>
          <span>Altere valores e serviços com total facilidade no painel sem precisar mexer em código.</span>
        </div>
      </li>
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>Visual Rida de Alto Padrão</strong>
          <span>Design sofisticado, exclusivo e responsivo para valorizar a imagem do seu comércio.</span>
        </div>
      </li>
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>Hospedagem &amp; Manutenção Inclusas</strong>
          <span>Servidores rápidos e estáveis, certificado SSL e suporte técnico prioritário contínuo.</span>
        </div>
      </li>
      <li>
        <div class="check-icon">✓</div>
        <div class="include-desc">
          <strong>Prazo de entrega ágil</strong>
          <span>Até 7 dias úteis com configuração completa e treinamento de uso do painel.</span>
        </div>
      </li>
    </ul>
  </div>

  <!-- Botão de Ação -->
  <div class="pricing-action text-center">
    <a href="https://wa.me/5519999118617?text=Ol%C3%A1!%20Gostaria%20de%20fechar%20o%20Plano%20RIDA%20Pro%20(Site%20%2B%20Sistema%20-%20Setup%20R$%201097%20%2B%20R$%20197/m%C3%AAs)." data-text="Olá! Gostaria de fechar o Plano RIDA Pro (Site + Sistema - Setup R$ 1097 + R$ 197/mês)." target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-lg js-whatsapp-link">
      <span class="whatsapp-icon-circle">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/>
        </svg>
      </span>
      <span>Escolher Plano RIDA Pro</span>
    </a>
    <span class="guarantee-text">Sem fidelidade obrigatória • Sistema completo pronto</span>
  </div>
</div>
```

---

## ❓ FAQ Associado ao Plano Pro

```html
<details class="faq-item">
  <summary class="faq-question">
    <span>Como funciona o agendamento online e o painel do Plano RIDA Pro?</span>
    <span class="faq-icon">+</span>
  </summary>
  <div class="faq-answer">
    <p>No <strong>Plano RIDA Pro (Site + Sistema)</strong>, seus clientes podem agendar horários sozinhos 24 horas por dia, direto pelo site. Você recebe todos os pedidos organizados em um painel administrativo exclusivo no próprio site, acessado com senha. Com 1 clique no WhatsApp, você envia a confirmação automática do horário para o cliente. Além disso, você tem liberdade para alterar preços e serviços sempre que quiser com autonomia e sem mexer em código.</p>
  </div>
</details>
```
