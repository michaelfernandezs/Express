const express = require('express');
const { scrapeData } = require('../controllers/scrapperController');

const router = express.Router();

// Endpoint para scraping
router.post('/', scrapeData);

module.exports = router;
