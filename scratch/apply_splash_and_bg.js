const fs = require('fs');

// ==============================================================================
// 1. UPDATE index.html
// ==============================================================================
let html = fs.readFileSync('index.html', 'utf8');

// Insert Splash Screen and Background Watermark right after <body>
const splashMarkup = `
  <!-- ================= ABERTURA DE ENTRADA (MÁXIMO 1.5s - LOGO ROLANDO COMO ESFERA) ================= -->
  <div id="siteSplash" class="site-splash" role="status" aria-label="Abertura Rida">
    <div class="splash-center">
      <div class="splash-roll-track">
        <div class="splash-sphere-wrap">
          <img src="assets/images/logo-rida-transparent.png" alt="Logo Rida" class="splash-sphere-img">
          <div class="splash-sphere-halo"></div>
        </div>
        <div class="splash-sphere-shadow"></div>
      </div>
      <div class="splash-brand-text">
        <span class="splash-title">RIDA</span>
        <span class="splash-subtitle">Sites Profissionais</span>
      </div>
    </div>
  </div>

  <!-- ================= MARCA D'ÁGUA DA LOGO NO FUNDO (PEQUENA, BRANCA, UNS TONS ACIMA DO FUNDO) ================= -->
  <div class="site-brand-bg" aria-hidden="true"></div>
`;

if (!html.includes('id="siteSplash"')) {
  html = html.replace('<body>', '<body>\n' + splashMarkup);
}

// Bump version tag
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=4.5');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=4.5');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');

// ==============================================================================
// 2. UPDATE styles.css
// ==============================================================================
let css = fs.readFileSync('styles.css', 'utf8');

const splashAndBgCss = `
/* ==============================================================================
   MARCA D'ÁGUA DA LOGO NO FUNDO (PEQUENA, BRANCA, UNS TONS ACIMA DO FUNDO)
   ============================================================================== */
.site-brand-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background-image: url('assets/images/pattern-logo-watermark.svg');
  background-repeat: repeat;
  background-size: 110px 110px;
  background-position: 0 0;
  opacity: 0.035;
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
}

body.dark-mode .site-brand-bg {
  opacity: 0.045;
  mix-blend-mode: screen;
}

body:not(.dark-mode) .site-brand-bg {
  opacity: 0.03;
  mix-blend-mode: multiply;
  filter: invert(1);
}

/* ==============================================================================
   ABERTURA DE ENTRADA DO SITE (MÁXIMO 1.5 SEGUNDOS - LOGO CHEGANDO ROLANDO)
   ============================================================================== */
.site-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: 999999;
  background: radial-gradient(circle at 50% 45%, #101726 0%, #07090e 75%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
}

.site-splash.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.splash-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  user-select: none;
}

/* Trilha e Conteiner da Esfera */
.splash-roll-track {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-sphere-wrap {
  width: 90px;
  height: 90px;
  position: relative;
  animation: splashSphereRollIn 0.78s cubic-bezier(0.16, 0.95, 0.3, 1) forwards;
  will-change: transform;
}

.splash-sphere-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.65));
}

/* Brilho radial pulsando quando para no centro */
.splash-sphere-halo {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(37, 99, 235, 0.15) 45%, transparent 70%);
  opacity: 0;
  transform: scale(0.7);
  pointer-events: none;
  animation: splashHaloPulse 0.45s ease-out 0.72s forwards;
}

/* Sombra de contato no chão da esfera */
.splash-sphere-shadow {
  position: absolute;
  bottom: -12px;
  left: 50%;
  width: 72px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 75%);
  transform: translateX(-50%) scaleX(0.2);
  animation: splashShadowIn 0.78s cubic-bezier(0.16, 0.95, 0.3, 1) forwards;
}

/* Revelação suave do texto RIDA */
.splash-brand-text {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(12px);
  animation: splashTextFadeIn 0.38s ease-out 0.75s forwards;
}

.splash-title {
  font-family: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 2px 12px rgba(255, 255, 255, 0.25);
}

.splash-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #94A3B8;
  margin-top: 3px;
}

/* Animação: Esfera rolando da esquerda para o centro */
@keyframes splashSphereRollIn {
  0% {
    transform: translateX(calc(-55vw - 100px)) rotate(-680deg);
    opacity: 0.5;
  }
  65% {
    opacity: 1;
  }
  100% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}

/* Animação: Sombra acompanhando a esfera */
@keyframes splashShadowIn {
  0% {
    transform: translateX(calc(-55vw - 100px)) scaleX(0.2);
    opacity: 0.2;
  }
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 0.75;
  }
}

/* Animação: Pulso de brilho após a chegada */
@keyframes splashHaloPulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.3);
  }
  100% {
    opacity: 0.35;
    transform: scale(1.1);
  }
}

/* Animação: Fade-in do texto da marca */
@keyframes splashTextFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .splash-roll-track {
    width: 80px;
    height: 80px;
  }
  .splash-sphere-wrap {
    width: 74px;
    height: 74px;
  }
  .splash-title {
    font-size: 1.55rem;
    letter-spacing: 4px;
  }
}
`;

if (!css.includes('.site-splash')) {
  css += '\n' + splashAndBgCss;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('styles.css updated successfully!');
}

// ==============================================================================
// 3. UPDATE script.js
// ==============================================================================
let js = fs.readFileSync('script.js', 'utf8');

const splashJs = `
// ==============================================================================
// ABERTURA DE ENTRADA (MÁXIMO 1.5s - LOGO ROLANDO COMO ESFERA)
// ==============================================================================
function initSiteSplash() {
  const splash = document.getElementById("siteSplash");
  if (!splash) return;

  let isDismissed = false;

  function dismissSplash() {
    if (isDismissed) return;
    isDismissed = true;

    splash.classList.add("is-hidden");
    setTimeout(() => {
      splash.style.display = "none";
    }, 380);
  }

  // Máximo 1.5s de abertura: 1150ms animação + 350ms fade-out = 1500ms cravados
  const timer = setTimeout(dismissSplash, 1150);

  // Toque ou clique em qualquer lugar adianta e fecha imediatamente
  splash.addEventListener("click", () => {
    clearTimeout(timer);
    dismissSplash();
  }, { once: true });
}
`;

if (!js.includes('function initSiteSplash()')) {
  // Add to DOMContentLoaded call
  js = js.replace(
    'document.addEventListener("DOMContentLoaded", () => {',
    'document.addEventListener("DOMContentLoaded", () => {\n  initSiteSplash();'
  );
  js += '\n' + splashJs;
  fs.writeFileSync('script.js', js, 'utf8');
  console.log('script.js updated successfully!');
}
