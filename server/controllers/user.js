const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.googleSignUp = async (req, res) => {
    let {
        uid,
        email,
        name,
        photoURL,
        username,
        socialLinks,
        location,
        bio,
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
                avatar: photoURL,
                username,
                socialLinks,
                userIsNew: false,
                location,
                bio,
                avatar,
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
