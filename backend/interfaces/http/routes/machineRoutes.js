const express = require('express');
const machineController = require('../../http/controllers/machineController');
const router = express.Router();

router.post('/add', machineController.addMachine);
router.post('/stop', machineController.stopMachine);
router.post('/start', machineController.startMachine);
router.get('/running', machineController.listRunningMachines);
router.post('/adjust', machineController.adjustMachineValue);
router.get('/list', machineController.listMachines);

module.exports = router;
