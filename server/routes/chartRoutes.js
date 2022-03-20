const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const verifyToken = require('../configurations/verifyToken');



router.get('/chart/get/:id', verifyToken, chartController.get);

router.get('/chart/getAll', verifyToken, chartController.getAll);

router.post('/chart/add', verifyToken, chartController.add);

router.put('/chart/update/:id', verifyToken, chartController.update);

router.delete('/chart/delete/:id', verifyToken, chartController.delete);

router.delete('/chart/deleteAll', verifyToken, chartController.deleteAll);


module.exports = router;