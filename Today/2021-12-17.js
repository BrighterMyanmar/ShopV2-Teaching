const router = require('express').Router();

const controller = require('../controllers/category');

router.get('/', controller.all);
router.post('/', controller.add);
// router.get('/:id',controller.get);
// router.patch('/:id',controller.patch);
// router.delete('/:id',controller.drop);


router.route("/:id")
   .get(controller.get),
   .patch(controller.patch)
      .delete(controller.drop)


module.exports = router;



let catRouter = require('./routes/category');

app.use('/cats', catRouter);
/*
/cats / -> get
/cats / -> post
/cats / 61bdc0c19980b678414fca5d -> get
/cats / 61bdc0c19980b678414fca5d -> patch
/cats / 61bdc0c19980b678414fca5d -> delete
*/
