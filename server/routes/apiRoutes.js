const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/api/health', apiController.health);
router.post('/api/user', apiController.addUser);
router.post('/api/animal', apiController.addAnimal);
router.post('/api/training', apiController.addTraining);
router.get('/api/admin/users', apiController.getUsers);
router.get('/api/admin/animals', apiController.getAnimals);
router.get('/api/admin/training', apiController.getTraining);
router.post('/api/user/login', apiController.login);
router.post('/api/user/verify', apiController.verify);

module.exports = router;