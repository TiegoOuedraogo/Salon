const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');

// Route to create a new service
router.post('/', serviceController.createService);

// Route to get all services
router.get('/', serviceController.getAllServices);

// Route to get a single service by ID
router.get('/:id', serviceController.getServiceById);

// Route to update a service by ID
router.put('/:id', serviceController.updateServiceById);

// Route to delete a service by ID
router.delete('/:id', serviceController.deleteServiceById);

module.exports = router;
