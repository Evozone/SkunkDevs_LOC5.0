const express = require('express');
const router = express.Router();

const { googleSignUp, search } = require('../controllers/user.js');

router.post('/googleSignUp', googleSignUp);
router.get('/:userId', search);
module.exports = router;
