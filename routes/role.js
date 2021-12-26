const router = require('express').Router();
const controller = require('../controllers/role');

router.get('/', controller.all);
router.post('/', controller.add);
router.post('/addpermit',controller.addPermit);
router.post('/removePermit',controller.removePermit);

router.route('/:id')
   .get(controller.get)
   .patch(controller.patch)
   .delete(controller.drop)

module.exports = router;