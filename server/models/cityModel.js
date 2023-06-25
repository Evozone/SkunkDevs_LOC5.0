import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityId: Number,
    name: String,
    altName: String,
    country: String,
    featureCode: String,
    adminCode: String,
    population: Number,
    loc: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

citySchema.index({ loc: '2dsphere' });

const City = mongoose.model('City', citySchema);

export default City;