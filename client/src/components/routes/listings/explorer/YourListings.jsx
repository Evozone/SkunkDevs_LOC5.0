// React
import React, { useEffect } from 'react';

// Material UI
import { Stack, Typography } from '@mui/material';

// Custom Components
import ListingCard from './ListingCard';

export default function YourListings({ listings, fetchListings, anyListings }) {
    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <Stack sx={{ flexGrow: 1 }} spacing={2}>
            <Typography variant='h3'>Your Listings</Typography>
            {/* Box with dotted faded border */}
            <Stack
                spacing={3}
                sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 5,
                    p: 3,
                    flexGrow: 1,
                }}
            >
                {anyListings ? (
                    listings.map((listing) => (
                        <ListingCard
                            key={listing._id}
                            {...{ listing, fetchListings }}
                        />
                    ))
                ) : (
                    <Typography variant='body1'>
                        You have no listings yet.
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
}
