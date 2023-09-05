var express = require('express');
const indexController = require('../controllers/indexController');

var router = express.Router();

/* GET home page. */


router.get('/', indexController.index);

router.post('/', indexController.index_post);

router.delete('/:id', indexController.index_delete);


router.get('/fridge', indexController.fridge);

router.delete('/fridge/:id', indexController.fridge_delete);

router.get('/freezer', indexController.freezer);

router.delete('/freezer/:id', indexController.freezer_delete);

router.get('/cupboard', indexController.cupboard);

router.delete('/cupboard/:id', indexController.cupboard_delete);

router.get("/:id", indexController.recipe);

module.exports = router;
