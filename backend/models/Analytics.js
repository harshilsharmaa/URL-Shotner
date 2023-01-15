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
    clicks:{
        type: Number,
        default: 0
    },
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
        type: Date
    }
})