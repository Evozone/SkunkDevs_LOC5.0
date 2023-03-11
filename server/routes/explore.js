const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    createPost,
    getPosts,
    getPostById,
    deletePostById,
} = require('../controllers/explore');

router.get('/getPosts', getPosts);
router.post('/create', auth, createPost);
router.get('/get/:id', getPostById);
router.delete('/delete/:id', auth, deletePostById);

module.exports = router;
