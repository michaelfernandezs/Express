const express = require('express');
const { scrapeData } = require('../controllers/scrapperController');
const Product = require('../models/products');
const router = express.Router();
 
  
router.post('/save-product', async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: 'Datos inválidos. Debes enviar un array de productos.' });
  }

  const validProducts = products.filter(product =>
    product.title && product.price && product.description && product.image
  );

  if (validProducts.length === 0) {
    return res.status(400).json({ error: 'No hay productos válidos para guardar.' });
  }

  try {
    const savedProducts = await Product.bulkCreate(validProducts);
    res.status(201).json(savedProducts);
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Failed to save products.', details: error.message });
  }
});


  
// Endpoint para scraping
router.post('/scrape', scrapeData)

module.exports = router;
