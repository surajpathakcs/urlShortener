const mongoose = require('mongoose');
//Require mongoose

//Create a schema
const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitHistory:[
        {timestamp:{
            type: Number,
        }}
    ] 
},{timestamps:true}
);

//use model from schema
const URL = mongoose.model('url',urlSchema);

module.exports = URL;