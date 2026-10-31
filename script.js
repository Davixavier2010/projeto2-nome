/**
 * ==============================================================================
 * CONFIGURAÇÃO CENTRAL DA AGÊNCIA (DAVI XAVIER & RICARDO VERÍSSIMO)
 * ==============================================================================
 * 
 * Prezado Davi e Ricardo:
 * Para atualizar o WhatsApp, E-mail ou Nome da Agência em todo o site,
 * basta alterar os valores abaixo! O script atualizará automaticamente todos
 * os botões e links da página.
 */
const SITE_CONFIG = {
  // Nome da Agência
  agencyName: "Rida",

  // Número do WhatsApp (somente números, com DDD e código do país 55)
  // Exemplo: "5511999998888"
  whatsappNumber: "5512974070207",

  // Mensagem padrão ao clicar no WhatsApp
  whatsappDefaultMessage: "Olá equipe da Rida! Gostaria de um site profissional para o meu comércio.",

  // E-mail de contato oficial
  email: "rida.xv10@gmail.com",

  // Nomes dos Fundadores
  founders: "Davi Xavier e Ricardo Veríssimo"
};

// ==============================================================================
// INICIALIZAÇÃO E APLICAÇÃO DAS CONFIGURAÇÕES
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  applySiteConfig();
  initMobileMenu();
  initZoomModal();
  initSmoothScroll();
  initHeaderScroll();
});

/**
 * Atualiza todos os elementos marcados com as informações da configuração
 */
function applySiteConfig() {
  // 1. Atualizar nome da agência nos elementos com a classe .js-agency-name
  const agencyElements = document.querySelectorAll(".js-agency-name");
  agencyElements.forEach(el => {
    el.textContent = SITE_CONFIG.agencyName;
  });

  // 2. Atualizar todos os links de WhatsApp
  const waLinks = document.querySelectorAll(".js-whatsapp-link");
  const encodedMsg = encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage);
  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMsg}`;

  waLinks.forEach(link => {
    const customText = link.getAttribute("data-text");
    if (customText) {
      link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(customText)}`;
    } else {
      link.href = waUrl;
    }
  });

  // 3. Atualizar link de WhatsApp no footer (texto visível)
  const contactWa = document.querySelector(".js-contact-whatsapp");
  if (contactWa) {
    if (!SITE_CONFIG.whatsappNumber || SITE_CONFIG.whatsappNumber.includes("0000000")) {
      contactWa.textContent = "Chamar no WhatsApp (Clique para conversar)";
    } else {
      contactWa.textContent = formatPhoneNumber(SITE_CONFIG.whatsappNumber);
    }
    contactWa.href = waUrl;
  }

  // 4. Atualizar link de E-mail no footer
  const contactEmail = document.querySelector(".js-contact-email");
  if (contactEmail) {
    contactEmail.textContent = SITE_CONFIG.email;
    contactEmail.href = `mailto:${SITE_CONFIG.email}`;
  }
}

/**
 * Formata número de telefone brasileiro para exibição amigável
 */
function formatPhoneNumber(num) {
  const clean = num.replace(/\D/g, "");
  if (clean.length === 13) {
    return `(${clean.slice(2,4)}) ${clean.slice(4,9)}-${clean.slice(9)}`;
  } else if (clean.length === 11) {
    return `(${clean.slice(0,2)}) ${clean.slice(2,7)}-${clean.slice(7)}`;
  }
  return num;
}

/**
 * Menu Mobile Hamburger
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    mainNav.classList.toggle("active");
    const isExpanded = toggleBtn.classList.contains("active");
    toggleBtn.setAttribute("aria-expanded", isExpanded);
  });

  // Fechar menu ao clicar em qualquer item
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("active");
      mainNav.classList.remove("active");
    });
  });

  // Fechar ao clicar fora
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !toggleBtn.contains(e.target) && mainNav.classList.contains("active")) {
      toggleBtn.classList.remove("active");
      mainNav.classList.remove("active");
    }
  });
}

/**
 * Modal de Zoom para Mockups
 */
function initZoomModal() {
  const modal = document.getElementById("zoomModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const closeBtn = document.getElementById("modalClose");
  const triggers = document.querySelectorAll(".js-zoom-trigger");

  if (!modal || !modalImg || !closeBtn) return;

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSrc = btn.getAttribute("data-target");
      const title = btn.getAttribute("data-title") || "Visualização do Modelo";
      
      modalImg.src = targetSrc;
      modalTitle.textContent = title;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Trava scroll da página
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Libera scroll
  };

  closeBtn.addEventListener("click", closeModal);

  // Fechar ao clicar fora do card
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * Scroll Suave para links internos com compensação do cabeçalho fixo
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Efeito visual de sombra no cabeçalho ao rolar a página
 */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
    } else {
      header.style.boxShadow = "none";
    }
  });
}
