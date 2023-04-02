const User = require('../models/User');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const UrlGroup = require('../models/UrlGroup'); 

exports.getAllUser = async (req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

exports.removeAllUser = async (req, res)=>{
    try {
        const users = await User.deleteMany();
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

exports.removeAllGroups = async(req,res)=>{
    try {
        const groups = await UrlGroup.deleteMany();
        res.status(200).json({
            success: true,
            groups
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

exports.getAllData = async(req,res)=>{
    try{

        const users = await User.find();
        const urls = await Url.find();
        const analytics = await Analytics.find();
        const groups = await UrlGroup.find();

        res.status(200).json({
            success: true,
            users:{count:users.length, users},
            urls:{count:urls.length, urls},
            analytics:{count:analytics.length, analytics},
            groups:{count:groups.length, groups}
        })

    }
    catch(error){
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

exports.dropDB = async (req, res)=>{
    try {
        const users = await User.collection.drop();
        const urls = await Url.collection.drop();
        const analytics = await Analytics.collection.drop();
        res.status(200).json({
            success: true,
            message: 'Database dropped successfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}