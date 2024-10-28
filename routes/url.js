const express = require('express');
const {handleGenerateNewShortURL, handleDeleteURL, handleGetOriginalURL, handleView, handleUpdateURL}  = require('../controllers/url')

const router = express.Router();


router.get('/',handleView)
router.post('/',handleGenerateNewShortURL);
router.delete('/:id',handleDeleteURL);
router.get('/:id',handleGetOriginalURL);
router.patch('/:id',handleUpdateURL)

module.exports = router;