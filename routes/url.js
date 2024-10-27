const express = require('express');
const {handleGenerateNewShortURL, handleDeleteURL, handleGetOriginalURL, handleView}  = require('../controllers/url')

const router = express.Router();


router.get('/',handleView)
router.post('/',handleGenerateNewShortURL);
router.delete('/:id',handleDeleteURL);
router.get('/:id',handleGetOriginalURL);

module.exports = router;