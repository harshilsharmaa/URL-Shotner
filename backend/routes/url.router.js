const express = require('express');
const urlRouter = express.Router();

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

const {
    anony_short,
    login_short,
    getMyUrls,
    viewUrl,
    deleteUrl,
    groupUrl,
    getAllGroups,
    getGroupById,
    deleteGroup
} = require('../controllers/url.controller');

urlRouter.route('/anony-short').post(anony_short);
urlRouter.route('/login-short').post(isAuthenticated, login_short);
urlRouter.route('/my-urls').get(isAuthenticated, getMyUrls);
urlRouter.route('/view/:hash').get(isAuthenticated, viewUrl);
urlRouter.route('/delete/:hash').delete(isAuthenticated, deleteUrl)
urlRouter.route('/group').post(isAuthenticated, groupUrl);
urlRouter.route('/group/all').get(isAuthenticated, getAllGroups);
urlRouter.route('/group/:id').get(isAuthenticated, getGroupById);
urlRouter.route('/group/delete/:id').delete(isAuthenticated, deleteGroup);

module.exports = urlRouter;