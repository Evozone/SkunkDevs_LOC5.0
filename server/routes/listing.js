import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import {
    createListing,
    getListings,
    deleteListing,
} from '../controllers/listing.js';

router.get('/getList', getListings);
router.post('/create', auth, createListing);
router.delete('/delete/:id', deleteListing);

export default router;
