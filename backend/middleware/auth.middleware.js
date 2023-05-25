const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async(req,res,next)=>{
    try {

        console.log(req.headers);
        // const  token  = req.cookies;
        const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                error: "Please login first",
                success: false
            })
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        if(!req.user){
            return res.status(401).json({
                error: "Please login first",
                success: false
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.checkPremimumExpiry = async(req,res,next)=>{
    try{

        const {user} = req;
        
        if(user.premiumMember === true){
            const currentDate = new Date();
            const premiumExpiryDate = new Date(user.premiumExpiryDate);

            if(currentDate > premiumExpiryDate){
                user.premiumMember = false;
                user.premiumPlan = null;
                user.premiumPlanStartDate = null;
                user.premiumExpiryDate = null;
                user.urlsLimitPerWeek = 5;
                await user.save();
            }
        }

        next();

    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.premiumMember = async(req,res,next)=>{
    try{
        const {user} = req;
        if(user.premiumMember === false){
            return res.status(401).json({
                error: "Please upgrade your account to premium",
                success: false
            })
        }
        next();
    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}