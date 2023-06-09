import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

export const search = async (req, res) => {
    try {
        const userId = req.params.userId;
        const keyword = req.query.search
            ? {
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { username: { $regex: req.query.search, $options: 'i' } },
                ],
            }
            : {};

        if (req.query.search) {
            const users = await UserModel.find(keyword).find({
                uid: { $ne: userId },
            });

            // Not decided yet
            // Return status 418

            res.status(418).json({
                success: true,
                result: { teapot: true },
                message: 'This is a teapot',
            });
        }
        else {
            const users = await UserModel.find({ uid: userId }).exec();

            if (users.length === 0) {
                res.status(200).json({
                    success: false,
                    result: null,
                    message: 'No such user',
                });
            } else {
                res.status(200).json({
                    success: true,
                    result: users[0],
                    message: 'User found',
                });
            }
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
