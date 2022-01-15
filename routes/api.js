const router = require('express').Router();
const { saveSingleFile, saveMultipleFile } = require('../utils/gallery');

const GalleryController = require('../controllers/gallery');
const OrderController = require('../controllers/order');
const UserController = require('../controllers/user');
const { validateBody, validateParam, validateToken } = require('../utils/validator');
const { UserSchema, AllSchema } = require('../utils/schema');

router.post('/file', saveSingleFile, GalleryController.saveFile);
router.post('/files', saveMultipleFile, GalleryController.saveFiles);
router.get('/files/:page', GalleryController.paginate);
router.post('/order', [validateToken(), OrderController.add]);
router.get('/order', [validateToken(), OrderController.getMyOrders]);
router.post('/register', [validateBody(UserSchema.register), UserController.register]);
router.post('/login', [validateBody(UserSchema.login), UserController.login]);
router.patch('/user/:id', [validateParam(AllSchema.id, "id"), UserController.patch]);
module.exports = router;