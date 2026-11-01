const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ==============================================================================
// 1. CSS RULES
// ==============================================================================
const additionalCss = `
/* ==============================================================================
   CONTROLE DE EXIBIÇÃO: COMPUTADOR VS CELULAR
   ============================================================================== */
/* Banner 3D: Visível APENAS no Computador (Oculto em telas <= 991px) */
@media (max-width: 991px) {
  .portfolio-mathias-banner,
  .desktop-only-feature {
    display: none !important;
  }
}

/* Vitrine de Cards (Academia e Doceria): Visível APENAS no Celular (Oculto em telas >= 992px) */
@media (min-width: 992px) {
  .mobile-only-showcase {
    display: none !important;
  }
}

/* ==============================================================================
   DROPDOWN DE CATEGORIAS DA VITRINE 3D (SEM EMOJIS, FECHA AO ESCOLHER)
   ============================================================================== */
.mathias-category-dropdown {
  position: relative;
  display: inline-block;
  z-index: 100;
}

.btn-category-trigger {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #FFFFFF;
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.btn-category-trigger:hover,
.btn-category-trigger.is-active {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.trigger-label {
  color: #94A3B8;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.trigger-current {
  color: #60A5FA;
  font-weight: 800;
}

.trigger-chevron {
  transition: transform 0.2s ease;
}

.btn-category-trigger.is-active .trigger-chevron {
  transform: rotate(180deg);
}

.category-dropdown-list {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background: #0f1520;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 110;
  backdrop-filter: blur(20px);
  animation: fadeInDropdown 0.2s ease;
}

@keyframes fadeInDropdown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-select-item {
  background: transparent;
  border: none;
  color: #CBD5E1;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;
}

.category-select-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
}

.category-select-item.active {
  background: #2563EB;
  color: #FFFFFF;
  font-weight: 700;
}

/* ==============================================================================
   PAINÉIS DE PREÇO E COMO FUNCIONA (ABREM AO CLICAR NAS ESFERAS)
   ============================================================================== */
.sphere-panel {
  animation: fadeInPanel 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.panel-header-close-bar {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0 8px 0;
}

.panel-bottom-close-bar {
  padding: 24px 0 12px 0;
}

.btn-hide-sphere-panel {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: var(--navy-primary);
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

body.dark-mode .btn-hide-sphere-panel {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  color: #F8FAFC;
}

.btn-hide-sphere-panel:hover {
  background: #EF4444;
  color: #FFFFFF;
  border-color: #EF4444;
}
`;

css += '\n' + additionalCss;
fs.writeFileSync('styles.css', css, 'utf8');
console.log('Appended new CSS successfully!');

// ==============================================================================
// 2. JAVASCRIPT LOGIC
// ==============================================================================
// In script.js:
// 1. Add sphere click handlers and navbar handlers for #preco and #como-funciona
// 2. Add category dropdown handlers inside initMathiasGallery

const sphereHandlerCode = `
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
`;

// Replace initMathiasGallery with dropdown support
const mathiasGalleryDropdownLogic = `
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
`;

// Insert sphereHandlerCode into script.js
if (!js.includes('function initSpherePanels()')) {
  js = js.replace('initMathiasGallery();', 'initMathiasGallery();\n  initSpherePanels();');
  js += '\n' + sphereHandlerCode;
}

// Update category logic in initMathiasGallery
// Replace old category listeners with dropdown logic
const oldCatListenerRegex = /\/\/ Filtros por Categoria[\s\S]*?renderCylinder\(\);\s*\}\);\s*\}\);/;
if (js.match(oldCatListenerRegex)) {
  js = js.replace(oldCatListenerRegex, mathiasGalleryDropdownLogic);
} else {
  // If not found, add before window resize
  js = js.replace('window.addEventListener("resize", () => {', mathiasGalleryDropdownLogic + '\n  window.addEventListener("resize", () => {');
}

fs.writeFileSync('script.js', js, 'utf8');
console.log('Updated script.js successfully!');

