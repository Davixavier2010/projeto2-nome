const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

// 1. Add initExtraHub to DOMContentLoaded
if (!js.includes('initExtraHub();')) {
  js = js.replace('initMathiasGallery();', 'initMathiasGallery();\n  initExtraHub();');
}

// 2. Add initExtraHub function implementation
const extraHubCode = `
/**
 * Central de Informações Adicionais (Expandir / Ocultar sob demanda)
 * Mantém a página inicial ultralimpa e permite ao cliente explorar
 * Diferenciais, Realidade do Mercado e FAQ com 1 clique.
 */
function initExtraHub() {
  const tabButtons = document.querySelectorAll(".btn-extra-tab");
  const panels = document.querySelectorAll(".extra-panel");
  const closeButtons = document.querySelectorAll(".js-close-extra-panel");

  function openPanel(targetId) {
    const targetPanel = document.getElementById(targetId);
    if (!targetPanel) return;

    const isAlreadyOpen = targetPanel.style.display !== "none" && targetPanel.classList.contains("is-open");

    if (isAlreadyOpen) {
      // Fechar o painel se já estiver aberto (toggle)
      targetPanel.style.display = "none";
      targetPanel.classList.remove("is-open");
      tabButtons.forEach(b => {
        if (b.dataset.target === targetId) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        }
      });
      return;
    }

    // Fechar outros painéis e abrir o selecionado
    panels.forEach(p => {
      p.style.display = "none";
      p.classList.remove("is-open");
    });
    tabButtons.forEach(b => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });

    targetPanel.style.display = "block";
    targetPanel.classList.add("is-open");

    tabButtons.forEach(b => {
      if (b.dataset.target === targetId) {
        b.classList.add("is-active");
        b.setAttribute("aria-selected", "true");
      }
    });

    // Rolar suavemente até o início do painel aberto
    setTimeout(() => {
      targetPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      if (targetId) openPanel(targetId);
    });
  });

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
        // Rolar de volta para a barra de botões
        const hubSection = document.getElementById("mais-informacoes");
        if (hubSection) {
          hubSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Suporte a âncoras diretas (ex: #promessa, #problema, #faq)
  function checkHashAnchor() {
    const hash = window.location.hash;
    if (hash === "#promessa") openPanel("panel-promessa");
    else if (hash === "#problema") openPanel("panel-problema");
    else if (hash === "#faq") openPanel("panel-faq");
  }

  checkHashAnchor();
  window.addEventListener("hashchange", checkHashAnchor);
}
`;

// Append initExtraHub at bottom if not exists
if (!js.includes('function initExtraHub()')) {
  js += '\n' + extraHubCode;
}

// 3. Rewrite initMathiasGallery with full category support and bulletproof modal isolation
const oldMathiasGalleryRegex = /function initMathiasGallery\(\) \{[\s\S]*$/;

const newMathiasGalleryCode = `function initMathiasGallery() {
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
      card.className = \`project-card-3d \${idx === currentIndex ? 'is-active' : ''}\`;
      card.dataset.index = idx;

      if (count === 1) {
        card.style.transform = 'translateZ(0px) rotateY(0deg)';
        card.style.filter = 'brightness(1) saturate(1)';
      } else {
        card.style.transform = \`rotateY(\${cardAngle}deg) translateZ(\${cylinderRadius}px)\`;
      }

      const planBadgeClass = p.plan === 'essencial' ? 'plan-tag-essencial' : 'plan-tag-personalizado';
      const waNumber = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber) ? SITE_CONFIG.whatsappNumber : '5512974070207';
      const waText = encodeURIComponent(\`Olá! Gostei muito do modelo "\${p.name}" (\${p.categoryName} - \${p.planLabel}) na galeria de vocês. Como podemos começar?\`);

      card.innerHTML = \`
        <div class="card-browser-bar">
          <div class="browser-dots">
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
          </div>
          <div class="browser-url-pill">\${p.displayUrl}</div>
          <span class="card-plan-tag \${planBadgeClass}">\${p.planLabel}</span>
        </div>
        <div class="card-screen-wrap">
          <img src="\${p.image}" alt="\${p.name}" class="card-screen-img" loading="lazy">
          <div class="card-info-overlay">
            <div class="card-info-meta">
              <div class="card-title-group">
                <h3>\${p.name}</h3>
                <p>\${p.niche}</p>
              </div>
              <div class="card-price-info">
                <div class="card-price-badge">\${p.price}</div>
                <div class="card-price-sub">\${p.monthly}</div>
              </div>
            </div>
            <div class="card-actions-row">
              <a href="\${p.url}" target="_blank" rel="noopener noreferrer" class="btn-card-visit">
                <span>Ver ao Vivo</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
              <a href="https://wa.me/\${waNumber}?text=\${waText}" target="_blank" rel="noopener noreferrer" class="btn-card-whatsapp js-whatsapp-link">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/></svg>
                <span>Quero Este</span>
              </a>
            </div>
          </div>
        </div>
      \`;

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
      cylinder.style.transform = \`translateZ(-\${cylinderRadius}px) rotateY(\${targetRotation}deg)\`;
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
        card.style.filter = \`brightness(\${brightness}) saturate(0.85)\`;
        card.style.pointerEvents = 'auto';
      }
    });

    const activeProject = filteredProjects[currentIndex];
    if (activeProject && bottomTitle) {
      const isMobile = window.innerWidth <= 768;
      if (count === 1) {
        bottomTitle.textContent = \`\${activeProject.name} • \${activeProject.categoryName}\`;
      } else if (isMobile) {
        bottomTitle.textContent = \`\${activeProject.name} (\${currentIndex + 1}/\${count})\`;
      } else {
        bottomTitle.textContent = \`\${activeProject.name} • \${activeProject.categoryName} (\${currentIndex + 1}/\${count})\`;
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
      cylinder.style.transform = \`translateZ(-\${cylinderRadius}px) rotateY(\${currentRot + dragAngle}deg)\`;
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

  // Filtros por Categoria
  document.querySelectorAll(".mathias-cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mathias-cat-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      currentCategory = btn.dataset.category || "all";

      if (currentCategory === "all") {
        filteredProjects = [...projects];
      } else {
        filteredProjects = projects.filter(p => p.category === currentCategory);
      }
      currentIndex = 0;
      renderCylinder();
    });
  });

  window.addEventListener("resize", () => {
    if (modal.classList.contains("is-open")) {
      calculateRadius();
      renderCylinder();
    }
  });
}
`;

js = js.replace(oldMathiasGalleryRegex, newMathiasGalleryCode);

fs.writeFileSync('script.js', js, 'utf8');
console.log('Successfully updated script.js with categories, radius, isolation, and extra hub!');

