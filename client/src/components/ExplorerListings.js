import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { lMode2, dMode2, lMode1, dMode1 } from '../utils/colors';

const ExplorerListings = ({ mode, listings, onDeleteListing }) => {
    return (
        // The listings here are explorer's listings
        <Box>
            {listings.length > 0 ? (
                listings.map((listing) => (
                    <Box
                        key={listing._id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 3,
                            borderRadius: '1rem',
                            bgcolor: mode === 'light' ? lMode2 : dMode2,
                            boxShadow: 2,
                            mb: 2,
                        }}
                    >
                        <Typography variant='h4' component='h2'>
                            {listing.city}
                        </Typography>
                        <Typography variant='subtitle1' component='p'>
                            Budget: {listing.budget.currency} {listing.budget.amount}
                        </Typography>
                        <Typography variant='subtitle1' component='p'>
                            From: {listing.fromDateTime}
                        </Typography>
                        <Typography variant='subtitle1' component='p'>
                            To: {listing.toDateTime}
                        </Typography>
                        <Typography variant='subtitle1' component='p'>
                            Tags: {listing.tags.join(', ')}
                        </Typography>
                        <Button variant='outlined' color='error' onClick={() => onDeleteListing(listing._id)}>
                            Delete Listing
                        </Button>
                    </Box>
                ))
            ) : (
                <Typography variant='h4' component='h2'
                    sx={{
                        color: mode === 'light' ? lMode1 : dMode2,
                        font: '600 1.5rem Poppins, sans-serif',
                    }}
                >
                    No Listings to Display
                </Typography>
            )
            }
        </Box >
    );
};

export default ExplorerListings;
