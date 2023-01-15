const mongoose = require('mongoose');

const urlGroupSchema = new mongoose.Schema({
    urlGroupName: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    analytics:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Analytics'
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    expiryDate: {
        type: Date
    }
})

const UrlGroup = mongoose.model('UrlGroup', urlGroupSchema);

module.exports = UrlGroup;