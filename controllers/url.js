const ShortID = require('ssid')
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({
        error: 'url is required'
    })

    const shortId=ShortID();
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory:[],
    })

    
    return res.json({ id: shortID})
    
};

async function handleGetOriginalURL(req,res){
        const shortID = req.params.id
        const urlEntry = await URL.findOne({shortId:shortID})

        if(urlEntry) {
           res.redirectURL(urlEntry.redirectURL)
        }
        else{
            res.status(400).json({
                error:"URL not found"
            })
        }
    
}

module.exports = {
    handleGenerateNewShortURL,
}