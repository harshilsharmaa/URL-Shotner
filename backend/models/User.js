const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    registerationType:{
        type: String,
        default: 'email'
    },
    password:{
        type: String,
        minLenght : 6,
    },
    // phone:{
    //     type: String,
    //     unique: true,
    // },
    urls:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Url'
        }
    ],
    urlsLimitPerWeek:{
        type: Number,
        default: 5
    },
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
        default: 0
    },
    utmCode:{
        type: String,
        unique: true,
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

userSchema.pre('save', async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }

    // genrate unique utm code
    const date = new Date();
    const utmCode = date.getTime().toString(36) + Math.random().toString(36).substr(6);
    this.utmCode = utmCode;

    next();
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET);
}


module.exports = mongoose.model('User', userSchema);
