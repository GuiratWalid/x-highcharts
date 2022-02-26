const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../configurations/verifyToken');
const upload = require('../configurations/uploadUserImage');



router.get('/user/get/:id', verifyToken, userController.get);

router.put('/user/update/:id', verifyToken, upload.single('image'), userController.update);

router.delete('/user/delete/:id', verifyToken, userController.delete);


module.exports = router;