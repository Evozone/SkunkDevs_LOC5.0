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
        type: String,
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
    description: {
        type: String,
    },
    monetizeType: {
        type: String,
        default: 'free', enum: ['free', 'premium']
    },
    parentCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    },
});

export default mongoose.model('Image', imageSchema);
