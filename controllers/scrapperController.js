const puppeteer = require('puppeteer');

exports.scrapeData = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      const title = document.querySelector('.ui-pdp-title')?.innerText || 'No title found';
      const price = document.querySelector('.ui-pdp-price__second-line .price-tag-fraction')?.innerText || 'No price found';
      return { title, price };
    });

    await browser.close();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error scraping the URL' });
  }
};
