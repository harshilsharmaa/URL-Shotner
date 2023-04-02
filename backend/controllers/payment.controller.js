const User = require('../models/User');
const Transaction = require('../models/Transaction');
const crypto = require("crypto");

exports.checkOut = async (req, res) => {

    try {
        const { instance } = require('../server.js');

        const {amount, plan_type} = req.body;
        console.log(amount, plan_type)

        var options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: "order_rcptid_11",
            notes: {
                plan_type
            }
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
            message: 'Order created successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.paymentVerification = async (req, res) => {
    try {
        const {instance} = require('../server.js');

        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;
        if(!isAuthentic){
            return res.status(400).json({
                success: false,
                message: 'Payment failed'
            })
        }

        const orderDetail = await instance.orders.fetch(razorpay_order_id);
        const user = await User.findById(req.user._id);

        const transaction = await Transaction.create({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            user: req.user._id,
            plan_type: orderDetail.notes.plan_type
        })

        user.premiumMember = true;
        user.premiumPlan = orderDetail.notes.plan_type;
        user.premiumPlanStartDate = Date.now();
        user.premiumExpiryDate = Date.now() + orderDetail.notes.plan_type * 24 * 60 * 60 * 1000;
        user.transcations.push(transaction._id);
        user.urlsLimitPerWeek = 10000;
        user.save();

        res.redirect(`http://localhost:3000/payment/success?reference=${razorpay_payment_id}`);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}