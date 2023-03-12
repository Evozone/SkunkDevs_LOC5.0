const ListingModel = require('../models/listingModel');

exports.createListing = async (req, res) => {
    const { city, budgetAmount, description, tags, fromDateTime, toDateTime } =
        req.body;
    const {
        uid: authorId,
        name: authorName,
        username: authorUsername,
        email: authorEmail,
    } = req.user;
    try {
        const result = await ListingModel.create({
            city,
            budgetAmount,
            description,
            tags,
            fromDateTime,
            toDateTime,
            authorId,
            authorName,
            authorUsername,
            authorEmail,
        });
        res.status(201).json({
            success: true,
            result,
            message: 'Listing created',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.getListings = async (req, res) => {
    try {
        const result = await ListingModel.find();
        console.log(result.length);
        res.status(200).json({
            success: true,
            result,
            message: '6 blogs fetched',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};
