const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    city: {
        type: String,
    },
    budgetAmount: {
        type: Number,
    },
    description: {
        type: String,
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
});

module.exports = mongoose.model('Listing', listingSchema);
