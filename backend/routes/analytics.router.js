const express = require('express');
const router = express.Router();


const { 
    getAnalytics,
    urlAnalytics,
    groupAnalytics,
    getClicks,
    genrateUrlReport 
} = require('../controllers/analytics.controller');

const {
    isAuthenticated,
    premiumMember
} = require('../middleware/auth.middleware');

router.route('/getAll').get(isAuthenticated, premiumMember, getAnalytics);
router.route('/url/:hash').get(isAuthenticated, premiumMember, urlAnalytics)
router.route('/report/url/:hash').get(isAuthenticated, premiumMember, genrateUrlReport)
router.route('/clicks').get(isAuthenticated, premiumMember, getClicks);
router.route('/group/:id').get(isAuthenticated, premiumMember, groupAnalytics);

module.exports = router;

