import express from 'express';
const router = express.Router();

import { googleSignUp, search } from '../controllers/user.js';

router.post('/googleSignUp', googleSignUp);
router.get('/:userId', search);

export default router;
