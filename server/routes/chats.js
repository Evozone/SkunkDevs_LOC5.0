import express from 'express';
const router = express.Router();

import { createChat, userChats, checkChat } from '../controllers/chat.js';
import auth from '../middleware/auth.js';

router.post('/', createChat);
router.get('/', auth, userChats);
router.get('/:id', checkChat);
export default router;
