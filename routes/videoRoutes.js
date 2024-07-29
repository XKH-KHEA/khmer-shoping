const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

// GET all videos
router.get("/", videoController.getAllVideos);

// POST save a new video
router.post("/", videoController.saveVideo);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { getAllVideos, saveVideo } = require('../controllers/videoController');

// // Get all videos
// router.get('/videos', getAllVideos);

// // Save a new video
// router.post('/videos', saveVideo);

// module.exports = router;
