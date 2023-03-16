const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    createPost,
    getPosts,
    getPostById,
    getPostsByFilter,
    deletePostById,
    search,
} = require('../controllers/explore');

router.get('/getPosts', getPosts);
router.get('/getPostsByFilter', getPostsByFilter)
router.post('/createPost', createPost);
router.get('/get/:id', getPostById);
router.get('/searchPosts/:monetizeType', search);
router.delete('/delete/:id', auth, deletePostById);

module.exports = router;
