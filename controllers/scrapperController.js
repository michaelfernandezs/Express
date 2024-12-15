const puppeteer = require('puppeteer');

exports.scrapeData = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Configura User-Agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    // Configura timeout
    await page.setDefaultNavigationTimeout(60000);

    // Navega a la URL
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Detecta el sitio y extrae datos
    const result = await page.evaluate(() => {
      const hostname = window.location.hostname;
      let title = 'No title found';
      let price = 'No price found';

      if (hostname.includes('mercadolibre')) {
        title = document.querySelector('.ui-pdp-title')?.innerText || title;
        price = document
          .querySelector('.ui-pdp-price__second-line .ui-pdp-price__part')
          ?.innerText || price;
      } else if (hostname.includes('liverpool')) {
        title =
          document.querySelector('.a-stickyBar__title p ')?.innerText ||
          title;
        price =
          document.querySelector('.a-stickyBar__price')?.innerText ||
          price;
      }

      return { title, price };
    });

    await browser.close();

    // Devuelve los datos extraídos
    res.json(result);
  } catch (error) {
    console.error('Error scraping the URL:', error.message);

    res.status(500).json({
      error: 'Error scraping the URL',
      details: error.message,
    });
  }
};
