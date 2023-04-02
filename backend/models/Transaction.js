const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planId:{
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);