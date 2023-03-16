import { useState, useEffect } from 'react';
// import { getFilteredListings } from '../api/listings'; // assuming you have an API function to fetch listings

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import axios from 'axios';

import { lMode2, dMode2, lMode1, dMode1, lMode3, dMode3 } from '../utils/colors';
import IconButton from '@mui/material/IconButton';

export default function PhotographerListings({
    mode,
    city,
    priceRange,
    selectedTags,
}) {
    const [listings, setListings] = useState([]);
    const [showListing, setShowListing] = useState([]);
    console.log(listings, showListing);

    useEffect(() => {
        console.log(city, priceRange, selectedTags, listings);
        const filteredcity = listings.filter((listing) => listing.city == city);
        const pricefilter = filteredcity.filter(
            (x) =>
                x.budgetAmount >= priceRange[0] &&
                x.budgetAmount <= priceRange[1]
        );
        console.log(selectedTags);
        let filteredCards = pricefilter;
        if (selectedTags.length !== 0) {
            filteredCards = pricefilter.filter((card) => {
                return card.tags.some((tag) => selectedTags.includes(tag));
            });
            console.log(filteredCards);
        }
        setShowListing((prev) => filteredCards);
    }, [city, priceRange, selectedTags]);

    useEffect(() => {
        const getList = async () => {
            const listFromServer = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/listing/getList`
            );
            console.log(listFromServer);
            setListings((prev) => listFromServer.data.result);
            setShowListing((prev) => listFromServer.data.result);
        };
        getList();
    }, []);
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                width: '100%',
            }}
        >
            {showListing.map((listing) => (
                <Card
                    key={listing.id}
                    sx={{
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '1rem',
                        bgcolor: mode === 'light' ? lMode3 : dMode3,
                        boxShadow: 2,
                        position: 'relative',
                        zIndex: 0,
                    }}>
                    <CardContent>
                        <IconButton sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <AddCommentIcon />
                        </IconButton>
                        <Typography variant='h4' component='h2'
                            sx={{
                                color: mode === 'light' ? lMode1 : dMode2,
                                font: '600 1.2rem Poppins, sans-serif',
                                mb: 1,
                            }}
                        >
                            {listing.description}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            City: {listing.city}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Price: ${listing.budgetAmount}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Tags: {listing.tags.join(', ')}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            From: {listing.fromDateTime}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            To: {listing.toDateTime}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Posted By: {listing.authorUsername}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            HR Email: {listing.authorEmail}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
