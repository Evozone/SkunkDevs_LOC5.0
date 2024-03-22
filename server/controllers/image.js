import ImageModel from '../models/imageModel.js';
import UserModel from '../models/userModel.js';

export const getPosts = async (req, res) => {
    try {
        const { filter, user } = req.query;
        const PAGE_SIZE = 10;
        let skip = req.query.page ? parseInt(req.query.page) : 0;

        let query = {};
        if (user) {
            query.createdBy = user;
        }
        if (filter) {
            query.monetizeType = filter;
        }

        const images = await ImageModel.find(query)
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

export const createPost = async (req, res) => {
    const {
        imageUrl,
        thumbnailUrl,
        description,
        tags,
        createdBy,
        createdAt,
        comments,
        monetizeType,
        parentCollection,
        altText,
    } = req.body;

    const likes = [];

    try {
        const result = await ImageModel.create({
            imageUrl,
            thumbnailUrl,
            description,
            tags,
            createdBy,
            createdAt,
            comments,
            likes,
            monetizeType,
            parentCollection,
            altText,
        });
        res.status(201).json({
            success: true,
            data: {
                result,
            },
        });
    } catch (error) {
        console.log(error);
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
                              $regex: req.query.search,
                              $options: 'i',
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

export const addImageComment = async (req, res) => {
    const { commentText } = req.body;
    const { id } = req.params;
    const { uid } = req.user;
    const createdAt = new Date().toISOString();
    const userResult = await UserModel.findOne({ uid: uid });
    const toAddComment = {
        commentBy: userResult._id,
        commentAt: createdAt,
        commentText,
        userName: userResult.username,
        avatar: userResult.avatar,
    };
    try {
        const result = await ImageModel.findByIdAndUpdate(id, {
            $push: {
                comments: toAddComment,
            },
        });
        res.status(200).json({
            success: true,
            data: {
                comments: toAddComment,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};

export const likeDislikeImage = async (req, res) => {
    const { id } = req.params;
    const { uid } = req.user;
    try {
        //first check if user already liked the post
        const image = await ImageModel.findById(id);
        const isLiked = image.likes.some((like) => like.likeBy == uid);
        if (isLiked) {
            //if liked, remove like
            const result = await ImageModel.findByIdAndUpdate(id, {
                $pull: {
                    likes: { likeBy: uid },
                },
            });
            res.status(200).json({
                success: true,
                data: {
                    message: 'Post disliked',
                },
            });
        } else {
            //if not liked, add like
            const result = await ImageModel.findByIdAndUpdate(id, {
                $push: {
                    likes: { likeBy: uid },
                },
            });
            res.status(200).json({
                success: true,
                data: {
                    message: 'Post liked',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
};
