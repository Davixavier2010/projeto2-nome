const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length, data }));
    }).on('error', reject);
  });
}

(async () => {
  const htmlRes = await checkUrl('http://localhost:3000/index.html');
  console.log('HTML status:', htmlRes.status);
  console.log('Includes siteSplash:', htmlRes.data.includes('id="siteSplash"'));
  console.log('Includes site-brand-bg:', htmlRes.data.includes('class="site-brand-bg"'));

  const svgRes = await checkUrl('http://localhost:3000/assets/images/pattern-logo-watermark.svg');
  console.log('Pattern SVG status:', svgRes.status, 'size:', svgRes.length);

  const transRes = await checkUrl('http://localhost:3000/assets/images/logo-rida-transparent.png');
  console.log('Transparent logo status:', transRes.status, 'size:', transRes.length);

  const whiteRes = await checkUrl('http://localhost:3000/assets/images/logo-rida-white.png');
  console.log('White logo status:', whiteRes.status, 'size:', whiteRes.length);

  const cssRes = await checkUrl('http://localhost:3000/styles.css?v=4.5');
  console.log('CSS status:', cssRes.status, 'includes site-splash:', cssRes.data.includes('.site-splash'));
  console.log('CSS includes site-brand-bg:', cssRes.data.includes('.site-brand-bg'));

  const jsRes = await checkUrl('http://localhost:3000/script.js?v=4.5');
  console.log('JS status:', jsRes.status, 'includes initSiteSplash:', jsRes.data.includes('initSiteSplash'));
})();
