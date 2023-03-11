const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const socialLinksSchema = new mongoose.Schema({
    twitter: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    },
});

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
    },
    socialLinks: socialLinksSchema,
    bio: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    username: {
        type: String,
        required: [true, 'Please Enter Unique Username'],
        unique: true,
    },
    role: {
        type: String,
        default: 'explorer',
    },
    skill_level: {
        type: String,
        default: 'beginner',
    },
    postImages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    pinnedPost: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    isNew: {
        type: Boolean,
        default: true,
    },
    collection: [
        {
            name: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            description: {
                type: String,
            },
            collectionImages: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Image',
                },
            ],
        },
    ],
    servicesOffered: [],
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = mongoose.model('User', userSchema);
