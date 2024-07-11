const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// GET all videos
router.get('/', videoController.getAllVideos);

// POST save a new video
router.post('/', videoController.saveVideo);

module.exports = router;
