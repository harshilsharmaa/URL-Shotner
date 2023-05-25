const Url = require("../models/Url");
const Analytics = require("../models/Analytics");
const User = require("../models/User");
const UrlGroup = require("../models/UrlGroup");

const {genrateUrlReport} = require('./genrateReport');

const calculateAnalytics = async (req, type) => {

    try {

        const userId = req.user._id;

        let os = [];
        let browser = [];
        let device = [];
        let clicksTotal = 0;
        let clicksThisYear = 0;
        let clicksThisMonth = 0;
        let clicksToday = 0;

        if (type === 'all' || type === 'group') {

            let allUrls;
            if (type === 'all') {
               allUrls = await Url.find({ owner: userId }).populate('analytics');
            }
            else if (type === 'group') {
                const group = await UrlGroup.findById(req.params.id).populate({path: 'urls', populate: {path: 'analytics'}});
                if(!group || group.owner.toString() !== userId.toString()){
                    return false;
                }
                allUrls = group.urls;
            }

            for (let i = 0; i < allUrls.length; i++) {
                const url = allUrls[i];
                const analytics = url.analytics;
                if (analytics) {
                    clicksTotal += analytics.clicks.length;
                    clicksThisYear += analytics.clicks.filter(click => click.getFullYear() === new Date().getFullYear()).length;
                    clicksThisMonth += analytics.clicks.filter(click => click.getMonth() === new Date().getMonth()).length;
                    clicksToday += analytics.clicks.filter(click => click.getDate() === new Date().getDate()).length;
                    os = os.concat(analytics.os);
                    browser = browser.concat(analytics.browsers);
                    device = device.concat(analytics.devices);
                }
            }

        }
        else if (type === 'single') {
            const analytics = await Analytics.findOne({ urlHash: req.params.hash, user: userId });

            if(!analytics) {
                return false;
            }

            clicksTotal = analytics.clicks.length;
            clicksThisYear = analytics.clicks.filter(click => click.getFullYear() === new Date().getFullYear()).length;
            clicksThisMonth = analytics.clicks.filter(click => click.getMonth() === new Date().getMonth()).length;
            clicksToday = analytics.clicks.filter(click => click.getDate() === new Date().getDate()).length;
            os = os.concat(analytics.os);
            browser = browser.concat(analytics.browsers);
            device = device.concat(analytics.devices);
        }

        let osCount = {};
        let browserCount = {};
        let deviceCount = {}

        for (let i = 0; i < os.length; i++) {
            osCount[os[i]] = (osCount[os[i]] || 0) + 1;
            browserCount[browser[i]] = (browserCount[browser[i]] || 0) + 1;
            deviceCount[device[i]] = (deviceCount[device[i]] || 0) + 1;
        }

        const osArray = [];
        const browserArray = [];
        const deviceArray = [];

        for (let key in osCount) {
            osArray.push({
                name: key,
                count: osCount[key]
            })
        }
        for (let key in browserCount) {
            browserArray.push({
                name: key,
                count: browserCount[key]
            })
        }
        for (let key in deviceCount) {
            deviceArray.push({
                name: key,
                count: deviceCount[key]
            })
        }


        return {
            clicks: {
                total: clicksTotal,
                thisYear: clicksThisYear,
                thisMonth: clicksThisMonth,
                today: clicksToday
            },
            os: osArray,
            browser: browserArray,
            device: deviceArray
        }
    }
    catch (err) {
        console.log(err);
    }

}
exports.getAnalytics = async (req, res) => {
    try {

        const analytics = await calculateAnalytics(req, 'all');
        return res.status(200).json({
            success: true,
            message: 'Analytics fetched successfully',
            analytics
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.urlAnalytics = async (req, res) => {
    try {

        const analytics = await calculateAnalytics(req, 'single');
        if(!analytics){
            return res.status(404).json({
                success: false,
                error: 'url not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Analytics fetched successfully',
            analytics
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.groupAnalytics = async (req, res) => {
    try {

        const analytics = await calculateAnalytics(req, 'group');
        if(!analytics){
            return res.status(404).json({
                success: false,
                error: 'group not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Analytics fetched successfully',
            analytics
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getClicks = async (req, res) => {
    try {

        let specificUrl = false;
        let specificGroup = false;
        if(req.query.group){
            specificGroup = true;
        }
        else if (req.query.hash) {
            specificUrl = true;
        }

        let analytics;
        if(specificGroup){
            const group = await UrlGroup.findById(req.query.group).populate({path: 'urls', populate: {path: 'analytics'}});
            if(!group || group.owner.toString() !== req.user._id.toString()){
                return res.status(404).json({
                    success: false,
                    message: 'Group not found'
                })
            }
            analytics = group.urls.map(url => url.analytics);
        }
        else if (specificUrl) {
            const url = await Url.findOne({ hash: req.query.hash });
            if (!url) {
                return res.status(404).json({
                    success: false,
                    message: 'Url not found'
                })
            }
            if (url.owner.toString() !== req.user._id.toString()) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }
            analytics = await Analytics.findOne({ urlHash: req.query.hash });
        }
        else {
            analytics = await Analytics.find({ user: req.user._id });

        }


        // ----------------   This Year ------------------------------
        if (req.query.duration === 'this-year') {

            let months = {
                1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0
            }
            if (specificUrl) {
                for (let i = 0; i < analytics.clicks.length; i++) {
                    if (analytics.clicks[i].getFullYear() === new Date().getFullYear()) {
                        months[analytics.clicks[i].getMonth() + 1]++;
                    }
                }
            }
            else {
                for (let i = 0; i < analytics.length; i++) {
                    for (let j = 0; j < analytics[i].clicks.length; j++) {
                        if (analytics[i].clicks[j].getFullYear() === new Date().getFullYear()) {
                            months[analytics[i].clicks[j].getMonth() + 1]++;
                        }
                    }
                }
            }

            let monthsName = { '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr', '5': 'May', '6': 'Jun', '7': 'Jul', '8': 'Aug', '9': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };

            for (let key in months) {
                months[monthsName[key]] = months[key];
                delete months[key];
            }

            return res.status(200).json({
                success: true,
                message: 'Clicks fetched successfully',
                clicks: months
            })
        }

        // ----------------   This Month ------------------------------

        if (req.query.duration === 'this-month') {

            let days = {
                1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, 31: 0
            }
            if (specificUrl) {
                for (let i = 0; i < analytics.clicks.length; i++) {
                    if (analytics.clicks[i].getMonth() === new Date().getMonth()) {
                        days[analytics.clicks[i].getDate()]++;
                    }
                }
            }
            else {
                for (let i = 0; i < analytics.length; i++) {
                    for (let j = 0; j < analytics[i].clicks.length; j++) {
                        if (analytics[i].clicks[j].getMonth() === new Date().getMonth()) {
                            days[analytics[i].clicks[j].getDate()]++;
                        }
                    }
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Clicks fetched successfully',
                clicks: days
            })
        }

        // ----------------   Today ------------------------------

        if (req.query.duration === 'today') {


            let hours = {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0
            }
            if (specificUrl) {
                for (let i = 0; i < analytics.clicks.length; i++) {
                    if (analytics.clicks[i].getDate() === new Date().getDate()) {
                        hours[analytics.clicks[i].getHours()]++;
                    }
                }
            }
            else {
                for (let i = 0; i < analytics.length; i++) {
                    for (let j = 0; j < analytics[i].clicks.length; j++) {
                        if (analytics[i].clicks[j].getDate() === new Date().getDate()) {
                            hours[analytics[i].clicks[j].getHours()]++;
                        }
                    }
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Clicks fetched successfully',
                clicks: hours
            })
        }

        // ----------------  Last 3 Months   or   Last 6 Months   or   Last 9 Months ------------------------------

        if (req.query.duration === 'last-3-months' || req.query.duration === 'last-6-months' || req.query.duration === 'last-9-months') {

            let months = {};

            let fromDate;
            if (req.query.duration === 'last-3-months') {
                fromDate = new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000);
                for (let i = 1; i <= 3; i++) {
                    months[new Date(fromDate.getTime() + i * 30 * 24 * 60 * 60 * 1000).getMonth() + 1] = 0;
                }
            }
            if (req.query.duration === 'last-6-months') {
                fromDate = new Date(new Date().getTime() - 180 * 24 * 60 * 60 * 1000);
                for (let i = 6; i >= 1; i--) {
                    months[new Date(fromDate.getTime() + i * 30 * 24 * 60 * 60 * 1000).getMonth() + 1] = 0;
                }
            }
            if (req.query.duration === 'last-9-months') {
                fromDate = new Date(new Date().getTime() - 270 * 24 * 60 * 60 * 1000);
                for (let i = 1; i <= 9; i++) {
                    months[new Date(fromDate.getTime() + i * 30 * 24 * 60 * 60 * 1000).getMonth() + 1] = 0;
                }
            }


            if (specificUrl) {
                for (let i = 0; i < analytics.clicks.length; i++) {
                    if (analytics.clicks[i] >= fromDate) {
                        months[analytics.clicks[i].getMonth() + 1]++;
                    }
                }
            }
            else {
                console.table(analytics);
                for (let i = 0; i < analytics.length; i++) {
                    for (let j = 0; j < analytics[i].clicks.length; j++) {
                        if (analytics[i].clicks[j] >= fromDate) {
                            months[analytics[i].clicks[j].getMonth() + 1]++;
                        }
                    }
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Clicks fetched successfully',
                clicks: months
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


exports.genrateUrlReport = async (req, res) => {
    try {

        const url = await Url.findOne({ hash: req.params.hash, owner: "64380346f6f5fc87d9d55603" });
        // const url = await Url.findOne({ hash: req.params.hash, owner: req.user._id });
        const analytics = await calculateAnalytics(req, 'single');
        if(!analytics || !url){
            return res.status(404).json({
                success: false,
                error: 'url not found'
            })
        }

        const genrated = await genrateUrlReport(url, analytics);

        if(!genrated){
            return res.status(400).json({
                success: false,
                message: 'Report not genrated',
            })
        }

        // res.download(genrated);
        return res.redirect("genrated");
        return res.status(200).json({
            success: true,
            message: 'Report genrated successfully',
            // reportUrl: `${process.env.BASE_URL}/${genrated}`
            reportUrl: `${genrated}`
        })
        
        
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}