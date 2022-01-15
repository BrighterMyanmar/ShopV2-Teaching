const router = require('express').Router();
const controller = require('../controllers/user');


router.post('/add/role', controller.addRole);

module.exports = router;
