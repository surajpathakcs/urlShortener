const express = require('express');
const {handleGenerateNewShortURL}  = require('../controllers/url')

const router = express.Router();

router.get('/',(req,res)=>{
    res.send(`<h1>APP Started</h1>`)
})


router.post('/',handleGenerateNewShortURL);

module.exports = router;