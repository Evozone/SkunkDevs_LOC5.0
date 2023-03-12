const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    createListing,
    getListings,
    deleteListing,
} = require('../controllers/listing');

router.get('/getList', getListings);
router.post('/create', auth, createListing);
router.delete('/delete/:id', deleteListing);

module.exports = router;
