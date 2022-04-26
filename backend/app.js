const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));



const Url = require('./models/Url');


app.post('/shorten', async(req, res)=>{

    const originalUrl = req.body.originalUrl;

    const checkUrl = await Url.findOne({originalUrl});

   

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let urlId = '';

    const genrateUrlId = ()=>{

        const charactersLength = characters.length;
        for ( let i = 0; i < 7; i++ ) {
            urlId += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    const checkUrlId = await Url.findOne({urlId});

    if(checkUrlId){
        genrateUrlId();
    }


    if(checkUrl){

        genrateUrlId();

        checkUrl.urlId = urlId; 
        checkUrl.save();
    }
    else{

        genrateUrlId();

        const url = await Url.create({
            originalUrl,
            urlId,
        })
    }


    res.status(200).json({
        urlId
    })
})

app.get('/:urlId', async(req, res)=>{

    try {

        const urlId = req.params.urlId;
        const url = await Url.findOne({urlId});
        if(url){
            return res.redirect(url.originalUrl);
        }

        res.status(404).json({
            error: 'Url not found'
        })

    } catch (error) {
        console.log(error);
    }

})


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});



module.exports = app;