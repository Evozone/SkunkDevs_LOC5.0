import ChatModel from '../models/chatModel.js';

export const createChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            chatId: req.body.chatId,
        });
        if (chat) {
            return res.status(200).json({
                success: true,
                result: chat,
                message: 'Chat already exists',
            });
        }
        const result = await ChatModel.create({
            userOne: req.body.userOneInfo,
            userTwo: req.body.userTwoInfo,
            chatId: req.body.chatId,
            lastMessageTime: req.body.lastMessageTime,
        });
        res.status(200).json({
            success: true,
            result,
            message: 'Chat created',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

export const userChats = async (req, res) => {
    const { uid: userId } = req.user;
    console.log(userId);
    try {
        const keyword = userId
            ? {
                $or: [{ chatId: { $regex: userId, $options: 'i' } }],
            }
            : {};
        const chat = await ChatModel.find(keyword);
        res.status(200).json({
            success: true,
            result: chat,
            message: 'Chats found',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

// Check if a chat exists between two users
export const checkChat = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const chat = await ChatModel.findOne({ chatId: id });
        if (!chat) {
            return res.status(200).json({
                success: true,
                result: null,
                message: 'Chat does not exist',
            });
        }
        res.status(200).json({
            success: true,
            result: chat,
            message: 'Chat exists',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}
