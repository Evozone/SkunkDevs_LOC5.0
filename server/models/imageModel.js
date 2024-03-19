import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
    },
    thumbnailUrl: {
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
        type: Date,
        default: Date.now,
    },
    uid: {
        type: String,
        unique: true,
    },
    comments: [
        {
            commentBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            likes: {
                type: Number,
            },
            commentAt: {
                type: String,
            },
            commentText: {
                type: String,
            },
        },
    ],
    likes: {
        type: Number,
    },
    caption: {
        type: String,
    },
    monetizeType: {
        type: String,
        default: 'free', enum: ['free', 'premium']
    },
    parentCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        default: null,
    },
});

export default mongoose.model('Image', imageSchema);
