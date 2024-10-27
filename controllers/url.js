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

    console.log({
        message:"Short URL Created"
        })
    
    return res.json({ id: shortId})
    
};

async function handleGetOriginalURL(req,res){
        const shortId= req.params.id
        const urlEntry = await URL.findOne({shortID:shortId})

        if(urlEntry) {
           res.redirect(urlEntry.redirectURL)
        }
        else{
            res.status(400).json({
                error:"URL not found"
            })
        }
    
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetOriginalURL
}