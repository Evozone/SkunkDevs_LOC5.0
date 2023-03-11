const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
    },
    altText: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: String,
    },
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    comments: [
        {
            commentBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            commentAt: {
                type: String,
            },
            commentText: {
                type: String,
            },
        },
    ],
    views: {
        type: Number,
    },
    description: {
        type: String,
    },
    monetizeType: {
        type: String,
        default: 'free',
    },
});

module.exports = mongoose.model('Image', imagesSchema);
