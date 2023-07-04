import BlogModel from '../models/blogModel.js';

// Get a list of all blogs
// The list should be sorted by createdAt in descending order
export const getBlogs = async (req, res) => {
    const { author } = req.query;

    try {
        const PAGE_SIZE = 6;
        let skip = req.query.page ? parseInt(req.query.page) : 0;

        if (author) {
            const result = await BlogModel.find({ authorId: author })
                .sort({ createdAt: -1 })
                .skip(skip * PAGE_SIZE)
                .limit(PAGE_SIZE);
            return res.status(200).json({
                success: true,
                result,
                message: `6 blogs fetched for user ${author}`,
            });
        } else {
            const result = await BlogModel.find()
                .sort({ createdAt: -1 })
                .skip(skip * PAGE_SIZE)
                .limit(PAGE_SIZE);
            return res.status(200).json({
                success: true,
                result,
                message: `6 blogs fetched`,
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

// Create a new blog
export const createBlog = async (req, res) => {
    const { title, summary, content, cover } = req.body;
    const {
        uid: authorId,
        name: authorName,
        username: authorUsername,
    } = req.user;
    try {
        const result = await BlogModel.create({
            title,
            summary,
            content,
            cover,
            authorId,
            authorName,
            authorUsername,
        });
        res.status(201).json({
            success: true,
            result,
            message: 'Blog created',
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

// Fetch one blog by id
export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await BlogModel.findById(id);
        res.status(200).json({
            success: true,
            result,
            message: 'Fetched a Blog by id',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'No blog found',
            error: error.message,
        });
        console.log(error);
    }
};

// Update a blog by id
export const editBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, summary, content, cover } = req.body;
    const { uid: authorId } = req.user;
    const update = {
        title,
        summary,
        content,
        cover,
    };
    try {
        const blog = await BlogModel.findById(id);
        if (blog.authorId !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to update this blog',
            });
        }
        await blog.updateOne(update);
        res.status(200).json({
            success: true,
            blog,
            message: 'Blog updated',
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

// Delete a blog by id
export const deleteBlogById = async (req, res) => {
    const { id } = req.params;
    const { uid: authorId } = req.user;
    try {
        const blog = await BlogModel.findById(id);
        if (blog.authorId !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this blog',
            });
        }
        await BlogModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Blog deleted',
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
