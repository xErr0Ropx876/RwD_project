const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/trending', resourceController.getTrendingResources);
router.get('/:id', resourceController.getResourceById);

module.exports = router;
