import ListingModel from '../models/listingModel.js';

// Function to get Exchange Rates
const getExchangeRate = async (currency) => {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_KEY}/latest/USD`);
        const data = await response.json();
        const rate = data.conversion_rates[currency];
        return rate;
    } catch (error) {
        console.log(error);
    }
};

// Function to convert to USD
const convertToUSD = async (currency, budget) => {
    const rate = await getExchangeRate(currency);
    const convertedBudget = (budget / rate).toFixed(2);
    return convertedBudget;
};

// Function to create a new listing
export const createListing = async (req, res) => {
    // Get data from req.body
    const { title, currency, budget, description, location, tags, fromDateTime, toDateTime } = req.body;

    // Get data from req.user (from auth middleware)
    const {
        uid: authorId,
        name: authorName,
        username: authorUsername,
        email: authorEmail,
    } = req.user;

    // Convert budget to USD if not already
    let convertedBudget;
    if (currency !== 'USD') {
        convertedBudget = await convertToUSD(currency, budget);
    } else {
        convertedBudget = budget;
    }

    // Fetch all listings which are active and have the same authorId
    const authorListings = await ListingModel.find({ authorId });

    // If any of the listings have a created date within the last 24 hours, return an error
    const now = new Date();
    const last24Hours = new Date(now - 24 * 60 * 60 * 1000);

    // If there are any listings, check if any are within the last 24 hours
    if (authorListings.length != 0) {
        const recentListings = authorListings.filter((listing) => new Date(listing.createdAt) > last24Hours);
        if (recentListings.length > 0){
            res.status(400).json({
                success: false,
                message: 'You can only create 1 listing every 24 hours',
            });
            return;
        }
    }

    // Create new listing
    try {
        const result = await ListingModel.create({
            title,
            budget: convertedBudget,
            description,
            location,
            tags,
            fromDateTime,
            toDateTime,
            authorId,
            authorName,
            authorUsername,
            authorEmail,
            createdAt: new Date().toISOString(),
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

// Function to get all Listings with query
export const getListings = async (req, res) => {
    const { city, budgetStart, budgetEnd, tags, fromDateTime, toDateTime, authorId } = req.query;
    try {
        // If it's a request for a specific user's listings
        if (authorId) {
            const result = await ListingModel.find({ authorId });
            res.status(200).json({
                success: true,
                result,
                message: 'Listings fetched',
            });
            return;
        } else if (authorId === '') {
            res.status(400).json({
                success: false,
                message: 'Author ID cannot be empty',
            });
            return;
        }

        // Else, it's a request for all listings, so build up query
        // Build up query by adding what is available
        const query = {};

        if (city) {
            query.city = city;
        }
        if (budgetStart && budgetEnd) {
            query.budgetAmount = { $gte: budgetStart, $lte: budgetEnd };
        }
        if (tags) {
            query.tags = { $in: tags };
        }
        if (fromDateTime) {
            query.fromDateTime = { $gte: fromDateTime };
        }
        if (toDateTime) {
            query.toDateTime = { $lte: toDateTime };
        }

        const result = await ListingModel.find(query);
        res.status(200).json({
            success: true,
            result,
            message: 'Listings fetched',
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

// Function to delete a listing based on :id
export const deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const list = await ListingModel.findById(id);
        if (list) {
            await ListingModel.findByIdAndDelete(id);

            res.status(200).json({
                success: true,
                message: 'List deleted',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'List not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
}; 