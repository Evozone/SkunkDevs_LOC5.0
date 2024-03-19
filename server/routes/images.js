import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
    createPost,
    getPosts,
    getPostById,
    deletePostById,
    search,
} from '../controllers/image.js';

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById); 
// router.get('/searchPosts/:monetizeType', search);
router.delete('/:id', auth, deletePostById);

export default router;
