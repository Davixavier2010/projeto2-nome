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

  // Número Principal do WhatsApp (somente números, com DDD e código do país 55)
  // Exemplo: "5511999998888"
  whatsappNumber: "5512974070207",

  // Segundo Número de Contato (WhatsApp)
  whatsappNumber2: "5519999118817",

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
  initThemeToggle();
  initMobileMenu();
  initZoomModal();
  initSmoothScroll();
  initHeaderScroll();
  initFeatureToggles();
  initMathiasGallery();
  initSpherePanels();
  initExtraHub();
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

  // 3.1 Atualizar segundo link de WhatsApp no footer
  const contactWa2 = document.querySelector(".js-contact-whatsapp2");
  if (contactWa2 && SITE_CONFIG.whatsappNumber2) {
    contactWa2.textContent = formatPhoneNumber(SITE_CONFIG.whatsappNumber2);
    contactWa2.href = `https://wa.me/${SITE_CONFIG.whatsappNumber2}?text=${encodedMsg}`;
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
 * Alternador de Modo Escuro / Claro (Preto / Creme)
 * Suporta persistência via localStorage e sincronização entre os botões
 */
function initThemeToggle() {
  const THEME_KEY = "rida_theme_mode";
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const mobileNavThemeBtn = document.getElementById("mobileNavThemeBtn");
  const buttons = [themeToggleBtn, mobileNavThemeBtn].filter(Boolean);

  function updateThemeUI(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
    }

    buttons.forEach(btn => {
      const textSpan = btn.querySelector(".theme-toggle-text, .mobile-theme-text");
      if (textSpan) {
        textSpan.textContent = isDark ? "Modo Claro" : "Modo Escuro";
      }
      btn.setAttribute("aria-label", isDark ? "Mudar para modo claro (creme)" : "Mudar para modo escuro (preto)");
      btn.setAttribute("title", isDark ? "Desativar Modo Escuro (Voltar ao Creme)" : "Ativar Modo Escuro (Fundo Preto)");
    });
  }

  // Verificar preferência salva no localStorage
  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialIsDark = savedTheme === "dark";

  updateThemeUI(initialIsDark);

  function toggleTheme() {
    const isCurrentlyDark = document.body.classList.contains("dark-mode");
    const newIsDark = !isCurrentlyDark;
    try {
      localStorage.setItem(THEME_KEY, newIsDark ? "dark" : "light");
    } catch(e) {}
    updateThemeUI(newIsDark);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });
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

/**
 * Alternador de recursos extras do plano (Botão com maiszinho "+")
 */
function initFeatureToggles() {
  const toggleButtons = document.querySelectorAll(".js-toggle-features");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");
      const targetList = document.getElementById(targetId);
      if (!targetList) return;

      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const iconSpan = btn.querySelector(".toggle-icon");
      const textSpan = btn.querySelector(".toggle-text");

      if (isExpanded) {
        targetList.classList.add("is-collapsed");
        btn.setAttribute("aria-expanded", "false");
        if (iconSpan) iconSpan.textContent = "+";
        if (textSpan) textSpan.textContent = btn.getAttribute("data-expand-text") || "Ver mais recursos inclusos";
      } else {
        targetList.classList.remove("is-collapsed");
        btn.setAttribute("aria-expanded", "true");
        if (iconSpan) iconSpan.textContent = "−";
        if (textSpan) textSpan.textContent = btn.getAttribute("data-collapse-text") || "Mostrar menos";
      }
    });
  });
}

/**
 * ==============================================================================
 * GALERIA 3D ESTILO MATHIAS ADOLFSSON (MATHIASADOLFSSON.DEV)
 * ==============================================================================
 */
function initMathiasGallery() {
  const modal = document.getElementById("mathiasGalleryModal");
  if (!modal) return;

  const cylinder = document.getElementById("mathiasCylinder");
  const stageWrapper = document.getElementById("mathiasStageWrapper");
  const bottomTitle = document.getElementById("mathiasBottomTitle");
  const btnClose = document.getElementById("btnCloseMathiasGallery");
  const btnPrev = document.getElementById("mathiasBtnPrev");
  const btnNext = document.getElementById("mathiasBtnNext");

  // Dados oficiais dos sites por nicho e categoria
  const projects = [
    {
      id: 'glacy',
      name: 'Glacy • Café & Bistrô',
      category: 'cafeteria',
      categoryName: 'Cafeteria & Bistrô',
      niche: 'Cafeteria, Restaurante Executivo & Pratos',
      plan: 'essencial',
      planLabel: 'Plano Essencial',
      price: 'Setup R$ 497 (2x R$ 248,50)',
      monthly: 'R$ 47/mês',
      url: 'https://glacy.vercel.app/',
      displayUrl: 'glacy.vercel.app',
      image: 'assets/images/gallery/site-glacy.jpg'
    },
    {
      id: 'padaria',
      name: 'Padaria Prestígio 1986',
      category: 'padaria',
      categoryName: 'Padaria & Confeitaria',
      niche: 'Panificação Tradicional & Fornadas',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 697 (2x R$ 348,50)',
      monthly: 'R$ 67/mês',
      url: 'https://padaria-prestigio.vercel.app/',
      displayUrl: 'padaria-prestigio.vercel.app',
      image: 'assets/images/gallery/site-padaria.jpg'
    },
    {
      id: 'academia',
      name: 'Academia VoltFit',
      category: 'academia',
      categoryName: 'Academia & Fitness',
      niche: 'Fitness, Musculação, Aulas & Treinos',
      plan: 'essencial',
      planLabel: 'Plano Essencial',
      price: 'Setup R$ 497 (2x R$ 248,50)',
      monthly: 'R$ 47/mês',
      url: 'https://academiarida-ashen.vercel.app/',
      displayUrl: 'academiarida-ashen.vercel.app',
      image: 'assets/images/gallery/site-academia.jpg'
    },
    {
      id: 'doceria',
      name: 'Doralice Confeitaria & Café',
      category: 'doceria',
      categoryName: 'Doceria Gourmet',
      niche: 'Doceria Fina & Encomendas Artesanais',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 697 (2x R$ 348,50)',
      monthly: 'R$ 67/mês',
      url: 'https://doceriarida.vercel.app/',
      displayUrl: 'doceriarida.vercel.app',
      image: 'assets/images/gallery/site-doceria.jpg'
    },
    {
      id: 'salao',
      name: 'Aura & Blush • Atelier de Beleza',
      category: 'salao',
      categoryName: 'Salão de Beleza & Estética',
      niche: 'Salão de Beleza, Spa & Cabeleireiro',
      plan: 'essencial',
      planLabel: 'Plano Essencial',
      price: 'Setup R$ 497 (2x R$ 248,50)',
      monthly: 'R$ 47/mês',
      url: 'https://salaorida.vercel.app/#inicio',
      displayUrl: 'salaorida.vercel.app',
      image: 'assets/images/gallery/site-salao.jpg'
    },
    {
      id: 'petshop',
      name: 'Dálmata Pet Spa & Boutique',
      category: 'petshop',
      categoryName: 'Pet Shop & Veterinária',
      niche: 'Pet Shop, Banho, Tosa & Cuidados Pet',
      plan: 'essencial',
      planLabel: 'Plano Essencial',
      price: 'Setup R$ 497 (2x R$ 248,50)',
      monthly: 'R$ 47/mês',
      url: 'https://petshoprida.vercel.app/',
      displayUrl: 'petshoprida.vercel.app',
      image: 'assets/images/gallery/site-petshop.jpg'
    },
    {
      id: 'jornalismo',
      name: 'Ruptura • Portal de Jornalismo',
      category: 'jornalismo',
      categoryName: 'Portal de Jornalismo',
      niche: 'Investigação, Notícias & Reportagens',
      plan: 'personalizado',
      planLabel: 'Plano Personalizado',
      price: 'Setup R$ 697 (2x R$ 348,50)',
      monthly: 'R$ 67/mês',
      url: 'https://jornalismo-rida.vercel.app/',
      displayUrl: 'jornalismo-rida.vercel.app',
      image: 'assets/images/gallery/site-jornalismo.jpg'
    }
  ];

  let currentCategory = 'all';
  let filteredProjects = [...projects];
  let currentIndex = 0;
  let cylinderRadius = 780;

  function calculateRadius() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const count = filteredProjects.length;

    if (count <= 1) {
      cylinderRadius = 0;
      return;
    }

    const angle = (Math.PI * 2) / Math.max(count, 3);

    if (isSmallMobile) {
      cylinderRadius = Math.round((280 / 2) / Math.tan(angle / 2));
      cylinderRadius = Math.min(Math.max(cylinderRadius, 290), 340);
    } else if (isMobile) {
      cylinderRadius = Math.round((310 / 2) / Math.tan(angle / 2));
      cylinderRadius = Math.min(Math.max(cylinderRadius, 320), 400);
    } else {
      cylinderRadius = Math.round((620 / 2) / Math.tan(angle / 2));
      if (cylinderRadius < 650) cylinderRadius = 650;
    }
  }

  function renderCylinder() {
    if (!cylinder) return;
    cylinder.innerHTML = '';
    const count = filteredProjects.length;
    if (count === 0) return;

    calculateRadius();
    const angleStep = count > 1 ? (360 / count) : 0;

    filteredProjects.forEach((p, idx) => {
      const cardAngle = idx * angleStep;
      const card = document.createElement('article');
      card.className = `project-card-3d ${idx === currentIndex ? 'is-active' : ''}`;
      card.dataset.index = idx;

      if (count === 1) {
        card.style.transform = 'translateZ(0px) rotateY(0deg)';
        card.style.filter = 'brightness(1) saturate(1)';
      } else {
        card.style.transform = `rotateY(${cardAngle}deg) translateZ(${cylinderRadius}px)`;
      }

      const planBadgeClass = p.plan === 'essencial' ? 'plan-tag-essencial' : 'plan-tag-personalizado';
      const waNumber = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber) ? SITE_CONFIG.whatsappNumber : '5512974070207';
      const waText = encodeURIComponent(`Olá! Gostei muito do modelo "${p.name}" (${p.categoryName} - ${p.planLabel}) na galeria de vocês. Como podemos começar?`);

      card.innerHTML = `
        <div class="card-browser-bar">
          <div class="browser-dots">
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
          </div>
          <div class="browser-url-pill">${p.displayUrl}</div>
          <span class="card-plan-tag ${planBadgeClass}">${p.planLabel}</span>
        </div>
        <div class="card-screen-wrap">
          <img src="${p.image}" alt="${p.name}" class="card-screen-img" loading="lazy">
          <div class="card-info-overlay">
            <div class="card-info-meta">
              <div class="card-title-group">
                <h3>${p.name}</h3>
                <p>${p.niche}</p>
              </div>
              <div class="card-price-info">
                <div class="card-price-badge">${p.price}</div>
                <div class="card-price-sub">${p.monthly}</div>
              </div>
            </div>
            <div class="card-actions-row">
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-card-visit">
                <span>Ver ao Vivo</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
              <a href="https://wa.me/${waNumber}?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn-card-whatsapp js-whatsapp-link">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/></svg>
                <span>Quero Este</span>
              </a>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        if (idx !== currentIndex) {
          goToIndex(idx);
        }
      });

      cylinder.appendChild(card);
    });

    updateCylinderPosition();
  }

  function updateCylinderPosition() {
    const count = filteredProjects.length;
    if (count === 0 || !cylinder) return;

    if (count === 1) {
      cylinder.style.transform = 'translateZ(0px) rotateY(0deg)';
    } else {
      const angleStep = 360 / count;
      const targetRotation = -currentIndex * angleStep;
      cylinder.style.transform = `translateZ(-${cylinderRadius}px) rotateY(${targetRotation}deg)`;
    }

    const cards = cylinder.querySelectorAll('.project-card-3d');
    cards.forEach((card, idx) => {
      if (count === 1) {
        card.classList.add('is-active');
        card.style.filter = 'brightness(1) saturate(1)';
        card.style.pointerEvents = 'auto';
        return;
      }
      let diff = Math.abs(idx - currentIndex);
      if (diff > count / 2) diff = count - diff;

      if (diff === 0) {
        card.classList.add('is-active');
        card.style.filter = 'brightness(1) saturate(1)';
        card.style.pointerEvents = 'auto';
      } else {
        card.classList.remove('is-active');
        const brightness = Math.max(0.35, 1 - diff * 0.32);
        card.style.filter = `brightness(${brightness}) saturate(0.85)`;
        card.style.pointerEvents = 'auto';
      }
    });

    const activeProject = filteredProjects[currentIndex];
    if (activeProject && bottomTitle) {
      const isMobile = window.innerWidth <= 768;
      if (count === 1) {
        bottomTitle.textContent = `${activeProject.name} • ${activeProject.categoryName}`;
      } else if (isMobile) {
        bottomTitle.textContent = `${activeProject.name} (${currentIndex + 1}/${count})`;
      } else {
        bottomTitle.textContent = `${activeProject.name} • ${activeProject.categoryName} (${currentIndex + 1}/${count})`;
      }
    }
  }

  function goToIndex(idx) {
    const count = filteredProjects.length;
    if (count <= 1) return;
    currentIndex = (idx + count) % count;
    updateCylinderPosition();
  }

  function openModal() {
    modal.style.display = "block";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("mathias-gallery-active");
    document.documentElement.classList.add("mathias-gallery-active");

    const mainContent = document.getElementById("mainContent");
    if (mainContent) mainContent.style.visibility = "hidden";

    const floatingWa = document.querySelector(".floating-whatsapp-wrapper");
    if (floatingWa) floatingWa.style.display = "none";

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    calculateRadius();
    renderCylinder();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("mathias-gallery-active");
    document.documentElement.classList.remove("mathias-gallery-active");

    const mainContent = document.getElementById("mainContent");
    if (mainContent) mainContent.style.visibility = "";

    const floatingWa = document.querySelector(".floating-whatsapp-wrapper");
    if (floatingWa) floatingWa.style.display = "";

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    setTimeout(() => {
      if (!modal.classList.contains("is-open")) {
        modal.style.display = "none";
      }
    }, 350);
  }

  // Event Listeners para abrir a galeria
  document.querySelectorAll(".js-open-mathias-gallery").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Fechar Galeria
  if (btnClose) {
    btnClose.addEventListener("click", closeModal);
  }
  document.querySelectorAll(".js-close-mathias-gallery").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  if (btnPrev) btnPrev.addEventListener("click", () => goToIndex(currentIndex - 1));
  if (btnNext) btnNext.addEventListener("click", () => goToIndex(currentIndex + 1));

  // Teclado
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") goToIndex(currentIndex - 1);
    if (e.key === "ArrowRight") goToIndex(currentIndex + 1);
  });

  // Drag physics para girar o cilindro
  let isDragging = false;
  let startX = 0;
  let dragDistance = 0;

  if (stageWrapper) {
    stageWrapper.addEventListener("pointerdown", (e) => {
      if (filteredProjects.length <= 1) return;
      if (e.target.closest("a") || e.target.closest("button")) return;
      isDragging = true;
      startX = e.clientX;
      dragDistance = 0;
      cylinder.classList.add("dragging");
      stageWrapper.setPointerCapture(e.pointerId);
    });

    stageWrapper.addEventListener("pointermove", (e) => {
      if (!isDragging || filteredProjects.length <= 1) return;
      const delta = e.clientX - startX;
      dragDistance = delta;
      const count = filteredProjects.length;
      const angleStep = 360 / count;
      const currentRot = -currentIndex * angleStep;
      const isMobile = window.innerWidth <= 768;
      const dragSensitivity = isMobile ? 0.25 : 0.15;
      const dragAngle = delta * dragSensitivity;
      cylinder.style.transform = `translateZ(-${cylinderRadius}px) rotateY(${currentRot + dragAngle}deg)`;
    });

    stageWrapper.addEventListener("pointerup", () => {
      if (!isDragging || filteredProjects.length <= 1) return;
      isDragging = false;
      cylinder.classList.remove("dragging");
      const isMobile = window.innerWidth <= 768;
      const swipeThreshold = isMobile ? 24 : 35;
      if (Math.abs(dragDistance) > swipeThreshold) {
        if (dragDistance < 0) goToIndex(currentIndex + 1);
        else goToIndex(currentIndex - 1);
      } else {
        updateCylinderPosition();
      }
    });
  }

  
  // Dropdown de Categorias
  const btnCatTrigger = document.getElementById("btnCategoryTrigger");
  const catDropdownList = document.getElementById("categoryDropdownList");
  const currentCatText = document.getElementById("currentCategoryText");

  if (btnCatTrigger && catDropdownList) {
    btnCatTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = catDropdownList.style.display === "flex" || catDropdownList.style.display === "block";
      catDropdownList.style.display = isOpen ? "none" : "flex";
      btnCatTrigger.classList.toggle("is-active", !isOpen);
      btnCatTrigger.setAttribute("aria-expanded", !isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#mathiasCategoryDropdown")) {
        catDropdownList.style.display = "none";
        btnCatTrigger.classList.remove("is-active");
        btnCatTrigger.setAttribute("aria-expanded", "false");
      }
    });

    document.querySelectorAll(".category-select-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const cat = item.dataset.category || "all";
        const catName = item.textContent.trim().split("(")[0].trim();

        // Atualizar texto do botão e fechar o menu imediatamente
        if (currentCatText) currentCatText.textContent = catName;
        catDropdownList.style.display = "none";
        btnCatTrigger.classList.remove("is-active");
        btnCatTrigger.setAttribute("aria-expanded", "false");

        document.querySelectorAll(".category-select-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        if (cat === "all") {
          filteredProjects = [...projects];
        } else {
          filteredProjects = projects.filter(p => p.category === cat);
        }
        currentIndex = 0;
        renderCylinder();
      });
    });
  }


  window.addEventListener("resize", () => {
    if (modal.classList.contains("is-open")) {
      calculateRadius();
      renderCylinder();
    }
  });
}


/**
 * Gerenciador de Exibição das Esferas (#preco e #como-funciona)
 * Por padrão, ficam ocultos para manter a página ultralimpa.
 * Clicar na esfera abre a respectiva área com animação e rolagem suave.
 */
function initSpherePanels() {
  const precoSection = document.getElementById("preco");
  const comoFuncionaSection = document.getElementById("como-funciona");
  const orbsShowcase = document.querySelector(".orbs-showcase");

  function openPreco() {
    if (!precoSection) return;
    precoSection.style.display = "block";
    setTimeout(() => {
      precoSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function closePreco() {
    if (!precoSection) return;
    precoSection.style.display = "none";
    if (orbsShowcase) {
      orbsShowcase.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function openComoFunciona() {
    if (!comoFuncionaSection) return;
    comoFuncionaSection.style.display = "block";
    setTimeout(() => {
      comoFuncionaSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function closeComoFunciona() {
    if (!comoFuncionaSection) return;
    comoFuncionaSection.style.display = "none";
    if (orbsShowcase) {
      orbsShowcase.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Cliques nas Esferas
  document.querySelectorAll(".js-trigger-preco, a[href='#preco']").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openPreco();
    });
  });

  document.querySelectorAll(".js-trigger-como-funciona, a[href='#como-funciona']").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openComoFunciona();
    });
  });

  document.querySelectorAll(".js-trigger-contato, a[href='#contato']").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const contato = document.getElementById("contato");
      if (contato) contato.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Botões de fechar/ocultar
  document.querySelectorAll(".js-close-preco").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closePreco();
    });
  });

  document.querySelectorAll(".js-close-como-funciona").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closeComoFunciona();
    });
  });

  // Se a página carregar com #preco ou #como-funciona no hash
  if (window.location.hash === "#preco") openPreco();
  if (window.location.hash === "#como-funciona") openComoFunciona();
}
