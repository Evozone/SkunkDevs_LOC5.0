import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title for a room is required'],
            maxLength: [55, 'Title cannot exceed 55 characters'],
        },
        description: {
            type: String,
            required: [true, 'Summary for room is required'],
            maxLength: [255, 'Summary cannot exceed 255 characters'],
        },
        roomId: {
            type: String,
            required: [true, 'Room ID is required'],
            unique: true,
        },
        cover: {
            type: String,
            required: [true, 'Cover for room is required'],
        },
        createdById: {
            type: String,
            required: [true, 'Moderator id is required'],
            unique: false,
        },
        createdByUsername: {
            type: String,
            required: [true, 'Moderator username is required'],
            unique: false,
        },
        createdByName: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Room', roomSchema);
