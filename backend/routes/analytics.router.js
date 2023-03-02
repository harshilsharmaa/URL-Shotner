const express = require('express');
const router = express.Router();


const { 
    getAnalytics,
    urlAnalytics,
    groupAnalytics,
    getClicks 
} = require('../controllers/analytics.controller');

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

router.route('/getAll').get(isAuthenticated, getAnalytics);
router.route('/url/:hash').get(isAuthenticated, urlAnalytics)
router.route('/clicks').get(isAuthenticated, getClicks);
router.route('/group/:id').get(isAuthenticated, groupAnalytics);

module.exports = router;

