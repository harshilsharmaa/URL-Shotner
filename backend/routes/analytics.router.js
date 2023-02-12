const express = require('express');
const router = express.Router();


const { 
    getAnalytics,
    getClicks 
} = require('../controllers/analytics.controller');

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

router.route('/getAll').get(isAuthenticated, getAnalytics);
router.route('/getClicks').get(isAuthenticated, getClicks);

module.exports = router;

