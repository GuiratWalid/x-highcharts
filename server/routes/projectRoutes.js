const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyToken = require('../configurations/verifyToken');



router.get('/project/get/:id', verifyToken, projectController.get);

router.get('/project/getAll', verifyToken, projectController.getAll);

router.post('/project/add', verifyToken, projectController.add);

router.put('/project/update/:id', verifyToken, projectController.update);

router.delete('/project/delete/:id', verifyToken, projectController.delete);

router.delete('/project/deleteAll', verifyToken, projectController.deleteAll);


module.exports = router;