const ImageModel = require('../models/imagesModel');

exports.getPosts = async (req, res) => {
    try {
        const PAGE_SIZE = 10;
        let skip = req.query.page ? parseInt(req.query.page) : 0;
        const images = await ImageModel.find()
            .sort({ createdAt: -1 })
            .skip(skip * PAGE_SIZE)
            .limit(PAGE_SIZE);
        res.status(200).json({
            success: true,
            data: {
                images,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};

exports.createPost = async (req, res) => {
    const {
        imageURL,
        description,
        tags,
        createdAt,
        comments,
        views,
        monetizeType,
    } = req.body;
    const { mid: createdBy } = req.user;
    try {
        const result = await ImageModel.create({
            imageURL,
            description,
            tags,
            createdAt,
            comments,
            views,
            monetizeType,
            createdBy,
        });
        res.status(201).json({
            success: true,
            data: {
                result,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ImageModel.findById(id);
        res.status(200).json({
            success: true,
            data: {
                result,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};

exports.deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ImageModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: {
                result,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};
