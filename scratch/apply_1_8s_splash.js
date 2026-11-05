const fs = require('fs');

// ==============================================================================
// 1. UPDATE index.html
// ==============================================================================
let html = fs.readFileSync('index.html', 'utf8');

// Remove .site-brand-bg
html = html.replace(/\s*<!-- ================= MARCA D'ÁGUA DA LOGO NO FUNDO[\s\S]*?class="site-brand-bg"[^>]*><\/div>/g, '');
html = html.replace(/\s*<div class="site-brand-bg"[^>]*><\/div>/g, '');

// Bump cache version tag
html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=5.0');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=5.0');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated: site-brand-bg removed!');

// ==============================================================================
// 2. UPDATE styles.css
// ==============================================================================
let css = fs.readFileSync('styles.css', 'utf8');

// Remove .site-brand-bg CSS
css = css.replace(/\/\* ==============================================================================\s*MARCA D'ÁGUA DA LOGO NO FUNDO[\s\S]*?filter: invert\(1\);\s*\}/g, '');
css = css.replace(/\.site-brand-bg\s*\{[\s\S]*?\}\s*body\.dark-mode\s*\.site-brand-bg\s*\{[\s\S]*?\}\s*body:not\(\.dark-mode\)\s*\.site-brand-bg\s*\{[\s\S]*?\}/g, '');

// Update .site-splash CSS for calibrated 1.8s duration
const updatedSplashCss = `
/* ==============================================================================
   ABERTURA DE ENTRADA DO SITE (1.8 SEGUNDOS - LOGO CHEGANDO ROLANDO COMO ESFERA)
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
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  width: 104px;
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-sphere-wrap {
  width: 92px;
  height: 92px;
  position: relative;
  animation: splashSphereRollIn 0.92s cubic-bezier(0.16, 0.95, 0.3, 1) forwards;
  will-change: transform;
}

.splash-sphere-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.7));
}

/* Brilho radial pulsando quando para no centro */
.splash-sphere-halo {
  position: absolute;
  inset: -18px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(37, 99, 235, 0.18) 45%, transparent 70%);
  opacity: 0;
  transform: scale(0.7);
  pointer-events: none;
  animation: splashHaloPulse 0.5s ease-out 0.86s forwards;
}

/* Sombra de contato no chão da esfera */
.splash-sphere-shadow {
  position: absolute;
  bottom: -12px;
  left: 50%;
  width: 76px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 75%);
  transform: translateX(-50%) scaleX(0.2);
  animation: splashShadowIn 0.92s cubic-bezier(0.16, 0.95, 0.3, 1) forwards;
}

/* Revelação suave do texto RIDA */
.splash-brand-text {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(12px);
  animation: splashTextFadeIn 0.42s ease-out 0.9s forwards;
}

.splash-title {
  font-family: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 2px 14px rgba(255, 255, 255, 0.25);
}

.splash-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #94A3B8;
  margin-top: 3px;
}

/* Animação: Esfera rolando da esquerda para o centro */
@keyframes splashSphereRollIn {
  0% {
    transform: translateX(calc(-55vw - 110px)) rotate(-720deg);
    opacity: 0.5;
  }
  60% {
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
    transform: translateX(calc(-55vw - 110px)) scaleX(0.2);
    opacity: 0.2;
  }
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 0.85;
  }
}

/* Animação: Pulso de brilho após a chegada */
@keyframes splashHaloPulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1.35);
  }
  100% {
    opacity: 0.35;
    transform: scale(1.15);
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
    width: 84px;
    height: 84px;
  }
  .splash-sphere-wrap {
    width: 76px;
    height: 76px;
  }
  .splash-title {
    font-size: 1.6rem;
    letter-spacing: 4px;
  }
}
`;

// Replace existing .site-splash block with updated 1.8s block
const splashIdx = css.indexOf('.site-splash');
if (splashIdx !== -1) {
  // Find where the previous splash block ends or replace to end of file
  css = css.slice(0, splashIdx) + updatedSplashCss.trim();
} else {
  css += '\n' + updatedSplashCss.trim();
}

fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css updated: splash calibrated to 1.8s!');

// ==============================================================================
// 3. UPDATE script.js
// ==============================================================================
let js = fs.readFileSync('script.js', 'utf8');

const updatedSplashJs = `
// ==============================================================================
// ABERTURA DE ENTRADA (1.8s - LOGO ROLANDO COMO ESFERA)
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
    }, 400);
  }

  // Duração total de 1.8 segundos cravados (1400ms animação + 400ms fade-out = 1800ms)
  const timer = setTimeout(dismissSplash, 1400);

  // Toque ou clique em qualquer lugar adianta e fecha imediatamente
  splash.addEventListener("click", () => {
    clearTimeout(timer);
    dismissSplash();
  }, { once: true });
}
`;

const jsSplashIdx = js.indexOf('function initSiteSplash()');
if (jsSplashIdx !== -1) {
  js = js.slice(0, jsSplashIdx) + updatedSplashJs.trim();
} else {
  js = js.replace(
    'document.addEventListener("DOMContentLoaded", () => {',
    'document.addEventListener("DOMContentLoaded", () => {\n  initSiteSplash();'
  );
  js += '\n' + updatedSplashJs.trim();
}

fs.writeFileSync('script.js', js, 'utf8');
console.log('script.js updated: timer set to 1.8s!');
