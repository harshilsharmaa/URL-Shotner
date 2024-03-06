const mongoose = require('mongoose');


const connectDB = async()=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(process.env.MONGO_URI).
        then(()=>{
            console.log('MongoDB Connected...');
            resolve(true);
        })
        .catch(err=>{
            console.log(err);
            reject(err);
        })
    })   
}

module.exports = connectDB;