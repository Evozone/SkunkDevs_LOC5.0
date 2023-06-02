import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
    createPost,
    getPosts,
    getPostById,
    getPostsByFilter,
    deletePostById,
    search,
} from '../controllers/explore.js';

router.get('/getPosts', getPosts);
router.get('/getPostsByFilter', getPostsByFilter)
router.post('/createPost', createPost);
router.get('/get/:id', getPostById);
router.get('/searchPosts/:monetizeType', search);
router.delete('/delete/:id', auth, deletePostById);

export default router;
