const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticationController = require('../controllers/authenticationController');
const upload = require('../configurations/uploadUserImage');


router.post('/register', upload.single('image'), authenticationController.register);

router.post('/login', authenticationController.login);


module.exports = router;