import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import { getRooms, createRoom, deleteRoom } from '../controllers/room.js';

router.get('/', getRooms);
router.post('/', auth, createRoom);
router.delete('/:id', auth, deleteRoom);
export default router;
