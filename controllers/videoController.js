const Video = require('../models/video');

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const saveVideo = async (req, res) => {
    const { url } = req.body;

    try {
        const newVideo = new Video({ url });
        await newVideo.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllVideos,
    saveVideo
};
