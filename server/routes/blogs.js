import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
    createBlog,
    getBlogs,
    getBlogById,
    editBlogById,
    deleteBlogById,
} from '../controllers/blog.js';

router.get('/', getBlogs);
router.post('/', auth, createBlog);
router.get('/:id', getBlogById);
router.patch('/:id', auth, editBlogById);
router.delete('/:id', auth, deleteBlogById);

export default router;
