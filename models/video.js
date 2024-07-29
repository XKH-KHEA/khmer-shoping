// const mongoose = require('mongoose');

// const videoSchema = new mongoose.Schema({
//     url: { type: String, required: true }
// });

// module.exports = mongoose.model('Video', videoSchema);

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    channelName: { type: String, required: true },
    views: { type: String, required: true },
    uploadedAt: { type: String, required: true },
    channelThumbnail: { type: String, required: true }
});

module.exports = mongoose.model('Video', videoSchema);
