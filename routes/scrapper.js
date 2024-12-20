const express = require('express');
const { scrapeData } = require('../controllers/scrapperController');
const product = require('../models/products');
const router = express.Router();
 
  
router.post('/save-product', async (req, res) => {
    const { name, description, price, image_url, product_url } = req.body;
  
    try {
      const product = await Product.create({
        name,
        description,
        price,
        image_url,
        product_url,
      });
      res.status(201).json(product);
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ error: 'Failed to save product.' });
    }
  });
// Endpoint para scraping
router.post('/save-products ', scrapeData)

module.exports = router;
