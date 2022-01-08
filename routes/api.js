const router = require('express').Router();
const { saveSingleFile, saveMultipleFile } = require('../utils/gallery');

const GalleryController = require('../controllers/gallery');
const OrderController = require('../controllers/order');

router.post('/file', saveSingleFile, GalleryController.saveFile);
router.post('/files', saveMultipleFile, GalleryController.saveFiles);
router.get('/files/:page', GalleryController.paginate);
router.post('/order', OrderController.add);
router.get('/order', OrderController.getMyOrders);
module.exports = router;