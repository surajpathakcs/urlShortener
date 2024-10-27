const ShortID = require('ssid')
const URL = require('../models/url');

async function handleView(req,res) {
    res.send(`<h1>APP Started</h1>`)
}

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
        const Id= req.params.id

        try{
            const urlEntry = await URL.findOne({shortID:Id})
            if(urlEntry) {
                return res.redirect(urlEntry.redirectURL)
                console.log("redirect")
            }
            else{
                res.status(404).json({
                    error:"URL not found"
                })
            }
        }
        catch(error){
            res.status(502).json({
                error:"Something went wrong"
            }
            )
        }
}

async function handleDeleteURL(req,res){
    const id = req.params.id

    try{        
        const urlEntry = await URL.findOne({shortID:id})
        if(!urlEntry){
            return res.status(404).json({
                error: "Entity Not Found"
            })
        }
        await URL.findOneAndDelete({shortID:id})
        res.status(200).json({
            message : "Deletion Success"
        })
    }
    catch(err){
        res.status(502).json({
            error:"Something went wrong"
        }
        )
    }
}

module.exports = {
    handleView,
    handleGenerateNewShortURL,
    handleGetOriginalURL,
    handleDeleteURL
}