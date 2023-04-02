const express = require('express');
const router = express.Router();

const {
    getAllUser,
    removeAllUser,
    dropDB,
    removeAllGroups,
    getAllData
} = require('../controllers/admin.controller');

router.route('/all-users').get(getAllUser);
router.route('/all-data').get(getAllData);
router.route('/remove-all-users').delete(removeAllUser);
router.route('/remove/groups').delete(removeAllGroups);
router.route('/drop-db').delete(dropDB);


module.exports = router;