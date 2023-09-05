const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors({credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', origin: ['http://localhost:3000', 'http://localhost:4000']}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });


// Route for getting the url
const {getUrl} = require('./controllers/url.controller');
app.get('/:hash', getUrl);

// Routes
const urlRouter = require('./routes/url.router');
const googleAuthRouter = require('./auth/google.auth');
const emailAuthRouter = require('./auth/email.auth');
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');
const analyticsRouter = require('./routes/analytics.router');
const paymentRouter = require('./routes/payment.router');

// // routers
app.get('/api/test', (req,res)=>{
    res.send("Health check, API is working !!");
})
app.use('/api/v1/url', urlRouter);
app.use('/auth', googleAuthRouter);
app.use('/auth-email', emailAuthRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/payment', paymentRouter);



const {urlSchedule} = require('./controllers/urlSchedule');
// cron.schedule('*/5 * * * * *', () => {
    // console.log("Running at every 5 seconds");
    // urlSchedule();
// });


app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/v/*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


module.exports = app;
