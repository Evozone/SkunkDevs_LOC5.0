import ImageModel from '../models/imageModel.js';

export const getPosts = async (req, res) => {
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
                result: images,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};

export const getPostsByFilter = async (req, res) => {
    try {
        const filter = req.query.filter;
        const images = await ImageModel.find({ monetizeType: filter });
        res.status(200).json({
            success: true,
            data: {
                result: images,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
}

export const createPost = async (req, res) => {
    const {
        imageURL,
        thumbnailUrl,
        description,
        tags,
        createdAt,
        uid,
        comments,
        views,
        monetizeType,
        createdBy,
    } = req.body;
    try {
        const result = await ImageModel.create({
            imageUrl: imageURL,
            thumbnailUrl,
            description,
            tags,
            createdAt,
            uid,
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

export const getPostById = async (req, res) => {
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

export const deletePostById = async (req, res) => {
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

export const search = async (req, res) => {
    try {
        const monetizeType = req.params.monetizeType;
        const keyword = req.query.search
            ? {
                $or: [
                    {
                        tags: {
                            $elemMatch: {
                                $regex: req.query.search,
                                $options: 'i',
                            },
                        },
                    },
                    {
                        description: {
                            $regex: req.query.search,
                            $options: 'i',
                        },
                    },
                ],
            }
            : {};
        const users = await ImageModel.find(keyword).find({
            monetizeType: monetizeType,
        });
        res.status(200).json({
            success: true,
            result: users,
            message: 'User found',
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
