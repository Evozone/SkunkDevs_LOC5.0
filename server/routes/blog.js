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

router.get('/getList', getBlogs);
router.post('/create', auth, createBlog);
router.get('/get/:id', getBlogById);
router.patch('/edit/:id', auth, editBlogById);
router.delete('/delete/:id', auth, deleteBlogById);

export default router;
