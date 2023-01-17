// dependencies
const express = require('express');
const apiController = require('../controllers/apiController');
const { authenticate } = require('../middleware/auth');

// initialize router
const router = express.Router();

// all API endpoints
router.get('/api/health', apiController.health);
router.post('/api/user', apiController.addUser);
router.post('/api/animal', authenticate, apiController.addAnimal);
router.post('/api/training', authenticate, apiController.addTraining);
router.get('/api/admin/users', authenticate, apiController.getUsers);
router.get('/api/admin/animals', authenticate, apiController.getAnimals);
router.get('/api/admin/training', authenticate, apiController.getTraining);
router.post('/api/user/login', apiController.login);
router.post('/api/user/verify', apiController.verify);

// exports all endpoints to be used
module.exports = router;