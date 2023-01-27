const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Route for getting the url
const {getUrl} = require('./controllers/url.controller');
app.get('/:hash', getUrl)

// Routes
const urlRouter = require('./routes/url.router');
const googleAuthRouter = require('./auth/google.auth');
const emailAuthRouter = require('./auth/email.auth');
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');

// routers
app.use('/api/v1/url', urlRouter);
app.use('/auth', googleAuthRouter);
app.use('/auth-email', emailAuthRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);

// app.use('/', (req, res) => {
//     res.send(
//         `
//         <html>
//             <body>
//                 <h1>URL Shortener</h1>
//                 <button><a href="/auth/google">Login with Google</a></button>
//             </body>
//         </html>
//         `
//     );
// })


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});



module.exports = app;