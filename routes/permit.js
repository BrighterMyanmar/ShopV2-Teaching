const router = require('express').Router();
const controller = require('../controllers/permit');

router.get('/', controller.all);

router.post('/', controller.add);

router.route("/:id")
   .get(controller.get)
   .patch(controller.patch)
   .delete(controller.drop)


module.exports = router;

