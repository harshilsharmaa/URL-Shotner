const express = require('express');

const router = express.Router();

const {
    isAuthenticated
} = require('../middleware/auth.middleware');

const {
    profile,
    deleteAccount
} = require('../controllers/user.controller');



router.route('/profile').get(isAuthenticated, profile);
router.route('/delete').delete(isAuthenticated, deleteAccount);


module.exports = router;