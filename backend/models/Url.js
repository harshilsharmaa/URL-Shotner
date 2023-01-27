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
    protected:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
    },
    urlName:{
        type: String,
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
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date,
    }
})

urlSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

urlSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;