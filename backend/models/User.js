const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLenght : 6,
    },
    phone:{
        type: String,
        unique: true,
    },
    urls:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Url'
        }
    ],
    urlsGroup:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UrlGroup'
        }
    ],
    analytics:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Analytics'
    },
    team:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    points:{
        type: Number,
    },
    premiumMember:{
        type: Boolean,
        default: false,
    },
    premiumPlan:{
        type: String
    },
    premiumPlanStartDate:{
        type: Date
    },
    premiumExpiryDate:{
        type: Date
    },
    transcations:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transcation'
        }
    ],
    loginDate:{
        type: Date
    },
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date
    },

    verifyEmailToken: String,
    verifyEmailExpires: Date,

    resetPasswordToken: String,
    resetPasswordExpires: Date,
});


module.exports = mongoose.model('User', userSchema);
