const router = require('express').Router();
const { saveSingleFile, saveMultipleFile } = require('../utils/gallery');

const GalleryController = require('../controllers/gallery');

router.post('/file', saveSingleFile, GalleryController.saveFile);
router.post('/files', saveMultipleFile, GalleryController.saveFiles);
router.get('/files/:page', GalleryController.paginate);
module.exports = router;