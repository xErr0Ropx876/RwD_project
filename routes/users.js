const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.post('/saved-collections', userController.toggleSaveCollection);
router.get('/saved-collections', userController.getSavedCollections);
router.post('/saved-resources', userController.toggleSaveResource);
router.get('/saved-resources', userController.getSavedResources);
router.post('/progress', userController.updateProgress);
router.get('/dashboard', userController.getDashboard);

module.exports = router;
