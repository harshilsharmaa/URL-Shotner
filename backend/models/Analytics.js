const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url'
    },
    urlHash:{
        type: String
    },
    clicks:[
        {   
            type: Date,
        }
    ],
    countries:{
        type: Array,
        default: []
    },
    devices:{
        type: Array,
        default: []
    },
    browsers:{
        type: Array,
        default: []
    },
    os:{
        type: Array,
        default: []
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Analytics', analyticsSchema);