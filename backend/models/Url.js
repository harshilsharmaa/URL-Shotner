const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    customHash: {
        type: Boolean,
        default: false
    },
    captcha:{
        type: Boolean,
        default: false
    },
    urlName:{
        type: String,
        default: '-'
    },
    urlGroup:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UrlGroup',
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    analytics:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Analytics',
    },
    status:{
        type: String,
        default: 'active'
    },
    scheduleStatus:{
        type: Boolean,
        default: false
    },
    scheduleTime:{
        type: Date
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: { expires: '1m' },
    // },
})

urlSchema.pre('save', async function(next){
    if(this.isModified('password')){
        console.log("abc");
        console.log(this.password);
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

urlSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;