const express = require('express');
const app = express();
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const User = require('../models/User');

const router = express.Router();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
}

async function verifyCallback(accessToken, refreshToken, profile, done) {

  try {

    const user = await User.findOne({email: profile._json.email});
    if(user){
      console.log('User already exists')
      return done(null, user)
    }

    const newUser = await User.create({
      username: profile._json.name,
      email: profile._json.email,
      registerationType: 'google',
      createdAt: Date.now()
    })

    done(null, newUser);

  } catch (error) {
    console.log(error)
  }

}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

app.use(passport.initialize());

router.route('/google').get(
  passport.authenticate('google', {
    scope: ['email', 'profile', 'openid', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
)

router.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateToken();
    const options = {
      httpOnly: true,
      secure: true,
      expiresIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
    // res.cookie('token', token, options)
    // .status(200).json({
    //   success: true,
    //   message: 'Login successful'
    // });

    res.cookie('token', token, options)
    .redirect('http://localhost:4000/dashboard-home')
  }
)

app.get('/logout', (req,res)=>{
  res.clearCookie('cookie');
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  })
})

module.exports = router;

