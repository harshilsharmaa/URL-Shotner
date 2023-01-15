const mongoose = require('mongoose');

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
    urlName:{
        type: String,
        required: true,
    },
    urlGroup:{
        type: String,
        required: true,
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
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    expiryDate: {
        type: Date,
    }
})


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;