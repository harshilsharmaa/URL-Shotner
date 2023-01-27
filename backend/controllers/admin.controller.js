const User = require('../models/User');

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

exports.dropDB = async (req, res)=>{
    try {
        const users = await User.collection.drop();
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