import express from 'express';
const router = express.Router();

import { getCities, getCityById } from '../controllers/city.js';

router.get('/', getCities);
router.get('/:cityId', getCityById);

export default router;