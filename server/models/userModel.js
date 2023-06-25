import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema({
    twitter: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    },
    pinterest: {
        type: String,
        default: '',
    },
    portfolio: {
        type: String,
        default: '',
    },
});

const locSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
    },
});

const locationSchema = new mongoose.Schema({
    cityId: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    loc: locSchema,
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
    },
    avatar: {
        type: String,
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
    location: locationSchema,
    skill_level: {
        type: String,
        default: null,
    },
    postImagesRef: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    pinnedPostRef: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    premiumCollection: [
        {
            name: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            description: {
                type: String,
            },
            collectionImagesRef: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Image',
                },
            ],
        },
    ],
    servicesOffered: [],
});

export default mongoose.model('User', userSchema);
