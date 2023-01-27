const express = require('express');
const router = express.Router();

const {
    getAllUser,
    removeAllUser,
    dropDB
} = require('../controllers/admin.controller');

router.route('/all-users').get(getAllUser);
router.route('/remove-all-users').delete(removeAllUser);
router.route('/drop-db').delete(dropDB);


module.exports = router;