const router = require('express').Router();
const { saveSingleFile } = require('../utils/gallery');
const controller = require('../controllers/subcat');

router.get('/', controller.all);

router.post('/', saveSingleFile, controller.add);

router.route("/:id")
   .get(controller.get)
   .patch(saveSingleFile, controller.patch)
   .delete(controller.drop)


module.exports = router;

