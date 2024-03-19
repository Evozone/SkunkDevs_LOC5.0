import mongoose from 'mongoose';
import { locationSchema } from './locationModel.js';

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title for listing is required'],
        maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    budget: {
        type: Number,
        required: [true, 'Budget for listing is required'],
        min: [0, 'Budget cannot be less than 0 dollars'],
        max: [1000000, 'Budget cannot be more than 1,000,000 dollars'],
    },
    description: {
        type: String,
        required: [true, 'Description for listing is required'],
        maxlength: [100, 'Description cannot be more than 100 characters'],
    },
    location: {
        type: locationSchema,
        required: [true, 'Location for listing is required'],
    },
    tags: [
        {
            type: String,
        },
    ],
    fromDateTime: {
        type: String,
    },
    toDateTime: {
        type: String,
    },
    authorId: {
        type: String,
    },
    authorName: {
        type: String,
    },
    authorUsername: {
        type: String,
    },
    authorEmail: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Listing', listingSchema);
