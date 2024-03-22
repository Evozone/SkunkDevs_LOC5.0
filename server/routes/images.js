import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
    createPost,
    getPosts,
    getPostById,
    deletePostById,
    search,
    addImageComment,
    likeDislikeImage,
} from '../controllers/image.js';

router.get('/', getPosts);
router.route('/').post(auth, createPost);
router.get('/:id', getPostById);
// router.get('/searchPosts/:monetizeType', search);
router.delete('/:id', auth, deletePostById);
router.post('/comment/:id', auth, addImageComment);
router.post('/comment/like/:id', auth, likeDislikeImage);
export default router;
