const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { createListing, getListings } = require('../controllers/listing');

router.get('/getList', getListings);
router.post('/create', auth, createListing);

module.exports = router;
