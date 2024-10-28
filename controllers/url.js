const ShortID = require('ssid')
const URL = require('../models/url');

async function handleView(req,res) {
    res.render('index')
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
            const urlEntry = await URL.findOneAndUpdate(
                {shortID:Id},
                {
                    $push:{
                        visitHistory:{
                            timestamp: Date.now()
                        }
                    }
                }
            )
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

async function handleUpdateURL(req,res) {
    const id = req.params.id;
    const url = req.body.url;

    try{
        if(!url){
           return res.status(400).json({
                error:"URL is not sent for Change"
            })
        }
        

        const urlEntry = await URL.findOneAndUpdate(
            {shortID:id},
            {redirectURL : url},
            { new: true } 
        )
        if(!urlEntry){
            return res.status(404).json({
                error:"URL with that Id does not exists"
            })
        }else{

            res.status(202).json({
                message:"Successfully Updated"
            })
        }
    }
    catch(error){
        return res.status(502).send({
            error : "Something went wrong while Updating"
        })
    }
}

module.exports = {
    handleView,
    handleGenerateNewShortURL,
    handleGetOriginalURL,
    handleUpdateURL,
    handleDeleteURL
}