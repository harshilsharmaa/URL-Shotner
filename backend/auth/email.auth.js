const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.route('/register').post(
    async(req,res)=>{

        try{
    
            if(!req.body.username || !req.body.email || !req.body.password){
                return res.status(400).json({
                    success:false,
                    message: 'Please Enter all the required field'
                })
            }
    
            if(req.body.password.length <8){
                return res.status(400).json({
                    success: false,
                    message: "minimum 8 characters required in password"
                })
            }
    
            const {username, email, password} = req.body;
    
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "User already Exist"
                });
            }
    
            const newUser = await User.create({
                username,
                email,
                password
            })

            if(req.query.utm){
                newUser.points = newUser.points + 10;
                await newUser.save();

                const refererUser = await User.findOne({utmCode: req.query.utm});
                if(refererUser){
                    refererUser.points = refererUser.points + 10;
                    await refererUser.save();
                }
            }

            const token = await newUser.generateToken();

            const option = {
                expiresIn: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true,
            }
    
            res.status(200).cookie('token', token, option).json({
                success: true,
                message: "User created successfully",
                user: newUser
            })
    
        }
        catch(error){
            res.status(500).json({
                success:false,
                error: error.message
            })
        }
    }
);

router.route('/login').post(
    async(req,res)=>{
        try {
    
            const {email, password} = req.body;
    
            if(!email || !password){
                return res.status(400).json({
                    success:false,
                    message: 'Please Enter all the required field'
                })
            }
    
            const user = await User.findOne({email});
    
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
            const isMatch = await user.comparePassword(password);
            if(!isMatch){
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
    
            const token = user.generateToken();
    
            const option = {
                expiresIn: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            }
    
            res.status(200).cookie('token', token, option).json({
                success: true,
                message: "User logged in successfully",
            })
            
        } catch (error) {
            res.status(500).json({
                success:false,
                error: error.message
            })
        }
    }
)

router.route('/logout').get(
    async(req,res)=>{
        try {
            res.clearCookie('token').json({
                success: true,
                message: "User logged out successfully"
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error: error.message
            })
        }
    }
)


module.exports = router;