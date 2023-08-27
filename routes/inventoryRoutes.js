var express = require('express');
const indexController = require('../controllers/indexController');

var router = express.Router();

/* GET home page. */


router.get('/', indexController.index);

router.post('/', indexController.index_post);


router.get('/fridge', indexController.fridge);

router.delete('/fridge/:id', indexController.fridge_delete);


router.get('/freezer', indexController.freezer);


router.get('/cupboard', indexController.cupboard);

module.exports = router;
