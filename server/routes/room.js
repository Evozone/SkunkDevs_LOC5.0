import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import { getRooms, createRoom, deleteRoom } from '../controllers/room.js';

router.get('/getRooms', getRooms);
router.post('/create', auth, createRoom);
router.delete('/delete/:id', auth, deleteRoom);
export default router;
