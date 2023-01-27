const Url = require('../models/Url');

async function genrateUrlCode() {
    try {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let urlId = '';

        const genrateUrlHash = () => {

            const charactersLength = characters.length;
            for (let i = 0; i < 7; i++) {
                urlId += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        genrateUrlHash();

        const checkUrlId = await Url.findOne({ hash: urlId });

        while (checkUrlId) {
            genrateUrlHash();
        }

        return urlId;
    }
    catch (error) {
        console.log(error);
    }
}

exports.anony_short = async (req, res) => {

    const originalUrl = req.body.originalUrl;

    const urlId = genrateUrlCode();

    console.log(urlId);

    // const url = await Url.create({
    //     originalUrl,
    //     urlId,
    // })

    res.status(200).json({
        urlId
    })
}

exports.login_short = async (req, res) => {
    try {

        const originalUrl = req.body.originalUrl;
        if(!originalUrl){
            return res.status(400).json({
                success: false,
                message: "Please enter original url"
            })
        }
        
        const user = req.user;

        // if(user.points < 5){
        //     return res.status(400).json({
        //         success: false,
        //         message: "You don't have enough points"
        //     })
        // }

        const hash = await genrateUrlCode();

       const url = await Url.create({
        longUrl: originalUrl,
        shortUrl: `${req.protocol}://${req.get("host")}/${hash}`,
        hash,
        owner: user._id,
        createdAt: Date.now()
       })

       if(req.body.urlName) url.urlName = req.body.urlName;
       if(req.body.urlGroup) {
            if(!user.urlGroups.includes(req.body.urlGroup)){
                return res.status(400).json({
                    success: false,
                    message: "You don't have this group"
                })
            }
            url.urlGroup = req.body.urlGroup;
       }
       if(req.body.password) url.password = req.body.password;

        // user.points = user.points - 5;
        user.urls.push(url._id);

        res.status(200).json({
            success: true,
            message: "Url created successfully",
            url
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

exports.getUrl = async (req, res) => {

    try {

        const hash = req.params.hash;
        const url = await Url.findOne({ hash });
        if (url) {

            if (url.password) {
                return res.redirect(`${req.protocol}://${req.get("host")}/protected/${hash}`);
            }

            return res.redirect(url.longUrl);
        }

        res.status(404).json({
            error: 'Url not found'
        })

    } catch (error) {
        console.log(error);
    }

}