const express = require('express');

const router = express.Router();

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

const {
    profile
} = require('../controllers/user.controller');



router.route('/profile').get(isAuthenticated, profile);


module.exports = router;