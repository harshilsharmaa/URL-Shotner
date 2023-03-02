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
    urls:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Url'
        }
    ],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const UrlGroup = mongoose.model('UrlGroup', urlGroupSchema);

module.exports = UrlGroup;