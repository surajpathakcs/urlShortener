const express = require('express');
const { connectToMongoDB } = require('./connection')
const allRoutes = require('./routes/url')

connectToMongoDB('')

const app = express();
const PORT = 8001;

app.use(express.json())

app.use('/',allRoutes)

app.listen(PORT,()=>{
    console.log(`listening on port: ${PORT}`);
});