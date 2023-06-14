import express from 'express';
const router = express.Router();

import { createChat, userChats } from '../controllers/chat.js';
import auth from '../middleware/auth.js';

router.post('/', createChat);
router.get('/', auth, userChats);
export default router;
