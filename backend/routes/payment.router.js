const express = require('express');
const router = express.Router();

const {
    checkOut,
    paymentVerification
} = require('../controllers/payment.controller');

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

router.route('/checkout').post(isAuthenticated, checkOut);
router.route('/verification').post(isAuthenticated, paymentVerification);

router.route('/getkey').get((req,res)=>{
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
})

module.exports = router;