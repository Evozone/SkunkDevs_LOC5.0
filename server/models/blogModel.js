import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title for blog is required'],
        },
        content: {
            type: String,
            required: [true, 'Content for blog is required'],
        },
        summary: {
            type: String,
            required: [true, 'Summary for blog is required'],
            maxLength: [55, 'Summary cannot exceed 55 characters'],
        },
        cover: String,
        authorId: {
            type: String,
            required: [true, 'Author is required'],
            unique: false,
        },
        authorName: {
            type: String,
            required: [true, 'Author is required'],
            unique: false,
        },
        authorUsername: {
            type: String,
            required: [true, 'Author is required'],
            unique: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Blog', blogSchema);
