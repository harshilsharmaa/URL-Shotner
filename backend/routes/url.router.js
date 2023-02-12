const express = require('express');
const urlRouter = express.Router();

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

const {
    anony_short,
    login_short,
    getMyUrls,
    viewUrl
} = require('../controllers/url.controller');

urlRouter.route('/anony-short').post(anony_short);

urlRouter.route('/login-short').post(isAuthenticated, login_short);

urlRouter.route('/my-urls').get(isAuthenticated, getMyUrls);

urlRouter.route('/view/:hash').get(isAuthenticated, viewUrl);

module.exports = urlRouter;