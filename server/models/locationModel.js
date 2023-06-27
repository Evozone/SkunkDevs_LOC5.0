import mongoose from 'mongoose';

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

export const locationSchema = new mongoose.Schema({
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

export default mongoose.model('Location', locationSchema);