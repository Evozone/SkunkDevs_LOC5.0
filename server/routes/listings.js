import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
    createListing,
    getListings,
    deleteListing,
} from '../controllers/listing.js';

router.get('/', getListings);
router.post('/', auth, createListing);
router.delete('/:id', deleteListing);

export default router;
