const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop Navbar and Hero
  const pageDesk = await browser.newPage();
  await pageDesk.setViewport({ width: 1440, height: 900 });
  await pageDesk.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await pageDesk.screenshot({
    path: 'C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/desktop-final-nav-hero.png',
    clip: { x: 0, y: 0, width: 1440, height: 500 }
  });

  // 2. Open Preço section and capture it
  await pageDesk.evaluate(() => {
    const orb = document.querySelector('.js-trigger-preco');
    if (orb) orb.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const precoEl = await pageDesk.$('#preco');
  if (precoEl) {
    await precoEl.screenshot({
      path: 'C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/desktop-final-preco-section.png'
    });
  }

  // 3. Open Como Funciona section and capture it
  await pageDesk.evaluate(() => {
    const orb = document.querySelector('.js-trigger-como-funciona');
    if (orb) orb.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const comoEl = await pageDesk.$('#como-funciona');
  if (comoEl) {
    await comoEl.screenshot({
      path: 'C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/desktop-final-como-funciona.png'
    });
  }

  // 4. Mobile View (Academia VoltFit & Doceria Doralice)
  const pageMob = await browser.newPage();
  await pageMob.setViewport({ width: 390, height: 844, isMobile: true });
  await pageMob.goto('http://localhost:3000/#portfolio', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  await pageMob.screenshot({
    path: 'C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/mobile-final-showcase-cards.png',
    fullPage: false
  });

  await browser.close();
  console.log('Screenshots saved successfully!');
})();

