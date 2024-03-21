import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    thumbnailUrl: {
        type: String,
    },
    altText: {
        type: String,
    },
    tags: {
        type: String,
    },
    createdBy: {
        type: String,
        required: [true, 'User ID is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
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
        required: [true, 'Description is required'],
    },
    monetizeType: {
        type: String,
        default: 'free',
        enum: ['free', 'premium'],
    },
    parentCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        default: null,
    },
});

export default mongoose.model('Image', imageSchema);
