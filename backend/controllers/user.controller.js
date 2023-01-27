const User = require('../models/User');

exports.profile = async (req, res)=>{
    try {
        
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}