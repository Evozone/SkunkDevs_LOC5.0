import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Create a new user
export const googleSignUp = async (req, res) => {
    let {
        uid,
        email,
        name,
        username,
        avatar,
    } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            const token = jwt.sign(
                { ...oldUser._doc },
                process.env.HMS_SECRET_APP,
                {
                    expiresIn: '100h',
                }
            );
            res.status(200).json({
                success: 'true',
                result: { ...oldUser._doc, token },
                message: 'User already exists',
            });
        } else {
            const user = await UserModel.create({
                uid,
                email,
                name,
                avatar,
                username,
            });
            const token = jwt.sign(
                { ...user._doc },
                process.env.HMS_SECRET_APP,
                {
                    expiresIn: '100h',
                }
            );
            res.status(201).json({
                success: true,
                result: { ...user._doc, token },
                message: 'User created',
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

// Return all users, paginated with query.
export const searchAll = async (req, res) => {
    try {
        const { page = 1, limit = 10, role, skill, uid, search } = req.query;
        let users, count;
        if (search) {
            users = await UserModel.find({ name: { $regex: search, $options: 'i' } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            count = await UserModel.countDocuments({ name: { $regex: search, $options: 'i' } });
        } else if (uid) {
            users = await UserModel.find({ uid: uid })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            count = await UserModel.countDocuments({ uid: uid });
        } else if (role) {
            if (role == 'photographer' && skill) {
                users = await UserModel.find({ role: role, skill_level: skill })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                count = await UserModel.countDocuments({
                    role: role,
                    skill: skill,
                });
            } else {
                users = await UserModel.find({ role: role })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                count = await UserModel.countDocuments({ role: role });
            }
        } else {
            users = await UserModel.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            count = await UserModel.countDocuments();
        }
        res.status(200).json({
            success: true,
            result: users,
            totalPages: Math.ceil(count / limit) || 0,
            currentPage: page,
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

// Search one user by username
export const searchOneByUsername = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await UserModel.findOne({ username: username }).exec();

        if (user) {
            res.status(200).json({
                success: true,
                result: user,
                message: 'User found',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
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

// Search one user by uid
export const searchOneByUid = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findOne({ uid: userId }).exec();

        if (user) {
            res.status(200).json({
                success: true,
                result: user,
                message: 'User found',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
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

// Update user
export const updateUser = async (req, res) => {
    let { name, username, avatar, bio, socialLinks, role, skill_level, location } = req.body;
    try {
        const userId = req.params.userId;
        const user = await UserModel.findOne({ uid: userId }).exec();

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        } else {
            // Update user
            const updatedUser = await UserModel.findOneAndUpdate({ uid: userId }, {
                name,
                username,
                avatar,
                bio,
                socialLinks,
                role,
                skill_level,
                location,
            }, { new: true }).exec();

            // New token
            const token = jwt.sign(
                { ...updatedUser._doc },
                process.env.HMS_SECRET_APP,
                {
                    expiresIn: '100h',
                }
            );

            res.status(200).json({
                success: true,
                result: { ...updatedUser._doc, token },
                message: 'User updated',
            });
        }
    } catch (error) {
        res.status(304).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

// Delete user
export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findOne({ uid: userId }).exec();

        if (user) {
            const result = await UserModel.deleteOne({ uid: userId }).exec();
            res.status(200).json({
                success: true,
                result: result,
                message: 'User deleted',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        res.status(304).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}