import express from 'express';
const router = express.Router();

import { googleSignUp, searchOneByUsername, searchOneByUid, searchAll, updateUser, deleteUserById } from '../controllers/user.js';

router.post('/', googleSignUp);
router.get('/', searchAll);
router.get('/:userId', searchOneByUid);
router.get('/username/:username', searchOneByUsername);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUserById);

export default router;
