const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    imageUrl: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    altText: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    comments: [
        {
            commentBy: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            commentAt: {
                type: Date,
                default: Date.now,
            },
            commentText: {
                type: String,
                required: true,
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
