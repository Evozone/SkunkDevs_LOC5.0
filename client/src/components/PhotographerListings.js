import { useState, useEffect } from 'react';
// import { getFilteredListings } from '../api/listings'; // assuming you have an API function to fetch listings

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function PhotographerListings({
    mode,
    city,
    priceRange,
    selectedTags,
}) {
    const [listings, setListings] = useState([]);

    // useEffect(() => {
    //     async function fetchListings() {
    //         // const allListings = await getFilteredListings(); // fetch all listings from the database
    //         // const filteredListings = allListings.filter(listing => {
    //         //     // filter the listings based on the passed-in props
    //         //     const isCityMatched = listing.city.toLowerCase().includes(city.toLowerCase());
    //         //     const isPriceInRange = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    //         //     const hasSelectedTags = selectedTags.every(tag => listing.tags.includes(tag));
    //         //     return isCityMatched && isPriceInRange && hasSelectedTags;
    //         // });
    //         // setListings(filteredListings);
    //     }
    //     fetchListings();
    // }, [city, priceRange, selectedTags]);
    useEffect(() => {
        const getList = async () => {
            const listFromServer = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/listing/getList`
            );
            console.log(listFromServer);
            setListings((prev) => listFromServer.data.result);
        };
        getList();
    }, []);
    return (
        <div>
            {listings.map((listing) => (
                <Card key={listing.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant='body1' sx={{ mb: 1 }}>
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
        </div>
    );
}
