const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
    },
    urlId: {
        type: String,
    }
})


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;