const express = require('express');
const path = require('path');
require('dotenv').config();
const { connectToMongoDB } = require('./connection')
const allRoutes = require('./routes/url')

connectToMongoDB(process.env.MONGO_URL).then(
    console.log("Mongo DB connected")
)

const app = express();
const PORT = 8001;

app.use(express.json())
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use('/',allRoutes)

app.listen(PORT,()=>{
    console.log(`listening on port: ${PORT}`);
});