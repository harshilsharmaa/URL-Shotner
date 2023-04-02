const app = require('./app');
var fs = require("fs");
var https = require("https");
const Razorpay = require('razorpay');

const connectDB = require('./config/database');
connectDB();

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.func =()=>{
  
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
//   .listen(PORT, function () {
//     console.log(
//       "listening on port 4000! Go to https://localhost:4000/"
//     );
//   });