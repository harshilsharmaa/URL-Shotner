const Url = require('../models/Url');
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const DeviceDetector = require('node-device-detector');

const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
});

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
        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "Please enter original url"
            })
        }

        const user = req.user;

        const hash = await genrateUrlCode();

        const url = await Url.create({
            longUrl: originalUrl,
            shortUrl: `${req.protocol}://${req.get("host")}/${hash}`,
            hash,
            owner: user._id,
            createdAt: Date.now()
        })

        if (req.body.urlName) url.urlName = req.body.urlName;
        if (req.body.urlGroup) {
            if (!user.urlGroups.includes(req.body.urlGroup)) {
                return res.status(400).json({
                    success: false,
                    message: "You don't have this group"
                })
            }
            url.urlGroup = req.body.urlGroup;
        }
        if (req.body.password) url.password = req.body.password;

        const analytic = await Analytics.create({
            url: url._id,
            user: user._id,
            hash: url.hash,
            createdAt: Date.now()
        })

        url.analytics = analytic._id;
        await url.save();

        // user.points = user.points - 5;
        user.urls.push(url._id);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Url created successfully",
            url
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUrl = async (req, res) => {

    try {

        const hash = req.params.hash;
        const url = await Url.findOne({ hash });
        if (url) {


            const analytic = await Analytics.findById(url.analytics);
            analytic.clicks.push(Date.now());

            if (req.headers['user-agent']) {
                const userAgent = req.headers['user-agent'];

                const result = detector.detect(userAgent);

                console.log(result);

                analytic.os.push(result.os.name);
                analytic.browsers.push(result.client.name);
                analytic.devices.push(result.device.type);

                // const device = deviceDetector.parse(userAgent);
                // analytic.devices.push(device.device.type);
                // analytic.browsers.push(device.client.name);
                // analytic.os.push(device.os.name);
            }

            if (req.headers['referer']) {
                const referer = req.headers['referer'];
                console.log(referer)

                // const country = await getCountry(referer);

                // const country = await getCountry(referer);
                // analytic.countries.push(country);
            }
            await analytic.save();


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

exports.getMyUrls = async (req, res) => {
    try {
        const user = req.user;

        // const urls = await User.findById(user._id).populate('urls');
        const { urls } = await user.populate('urls');

        res.status(200).json({
            success: true,
            message: "Urls fetched successfully",
            urls
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.viewUrl = async (req, res) => {
    try{

        const { hash } = req.params;
        const user = req.user;

        const url = await Url.findOne({ hash, owner: user._id });
        if(!url){
            return res.status(404).json({
                success: false,
                message: "Url not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Url fetched successfully",
            url
        })

    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}