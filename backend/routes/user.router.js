const express = require('express');

const router = express.Router();

const {
    isAuthenticated,
    checkPremimumExpiry
} = require('../middleware/auth.middleware');

const {
    profile,
    deleteAccount,
    urlsLimit
} = require('../controllers/user.controller');



router.route('/profile').get(isAuthenticated, checkPremimumExpiry, profile);
router.route('/urls-limit').get(isAuthenticated, urlsLimit);
router.route('/delete').delete(isAuthenticated, deleteAccount);


module.exports = router;