const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const upload = require('../configurations/uploadCategoryImage');



router.get('/category/get/:id', categoryController.get);

router.get('/category/getAll', categoryController.getAll);

router.post('/category/add', upload.single('image'), categoryController.add);

router.put('/category/update/:id', upload.single('image'), categoryController.update);

router.delete('/category/delete/:id', categoryController.delete);

router.delete('/category/deleteAll', categoryController.deleteAll);


module.exports = router;