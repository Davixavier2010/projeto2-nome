const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

const extraHubImplementation = `
/**
 * Central de Informações Adicionais (#mais-informacoes)
 * Controla os 3 botões (Diferenciais, Análise de Mercado, FAQ)
 * Ao clicar, exibe/oculta o painel correspondente com animação e rolagem suave.
 */
function initExtraHub() {
  const tabButtons = document.querySelectorAll(".btn-extra-tab");
  const panels = document.querySelectorAll(".extra-panel");
  const closeButtons = document.querySelectorAll(".js-close-extra-panel");

  function openPanel(targetId) {
    const targetPanel = document.getElementById(targetId);
    if (!targetPanel) return;

    const isCurrentlyOpen = targetPanel.style.display !== "none" && targetPanel.classList.contains("is-open");

    if (isCurrentlyOpen) {
      // Toggle: fecha se já estiver aberto
      targetPanel.style.display = "none";
      targetPanel.classList.remove("is-open");
      tabButtons.forEach(btn => {
        if (btn.dataset.target === targetId) {
          btn.classList.remove("is-active");
          btn.setAttribute("aria-selected", "false");
        }
      });
      return;
    }

    // Fecha todos os outros painéis e desativa outros botões
    panels.forEach(p => {
      p.style.display = "none";
      p.classList.remove("is-open");
    });
    tabButtons.forEach(btn => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });

    // Abre o painel desejado
    targetPanel.style.display = "block";
    targetPanel.classList.add("is-open");

    tabButtons.forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
      }
    });

    // Rolagem suave até o início do painel aberto
    setTimeout(() => {
      targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  // Listener nos 3 botões de abas
  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      if (targetId) {
        openPanel(targetId);
      }
    });
  });

  // Listener nos botões de fechar/ocultar de dentro dos painéis
  closeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const panel = btn.closest(".extra-panel");
      if (panel) {
        panel.style.display = "none";
        panel.classList.remove("is-open");
        tabButtons.forEach(b => {
          if (b.dataset.target === panel.id) {
            b.classList.remove("is-active");
            b.setAttribute("aria-selected", "false");
          }
        });
        const hub = document.getElementById("mais-informacoes");
        if (hub) {
          hub.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Suporte a links diretos por hash
  function checkHash() {
    const hash = window.location.hash;
    if (hash === "#promessa") openPanel("panel-promessa");
    else if (hash === "#problema") openPanel("panel-problema");
    else if (hash === "#faq") openPanel("panel-faq");
  }

  checkHash();
  window.addEventListener("hashchange", checkHash);
}
`;

js += '\n' + extraHubImplementation;

fs.writeFileSync('script.js', js, 'utf8');
console.log('Successfully appended initExtraHub to script.js!');

