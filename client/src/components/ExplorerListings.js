import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

import { lMode2, dMode2, lMode1, dMode1 } from '../utils/colors';
import axios from 'axios';

const ExplorerListings = ({ mode, listings, onDeleteListing }) => {
    const [prevlistings, setPrevlistings] = useState([]);
    useEffect(() => {
        const getList = async () => {
            const listFromServer = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/listing/getList`
            );
            console.log(listFromServer);
            setPrevlistings((prev) => listFromServer.data.result);
        };
        getList();
    }, []);
    return (
        // The listings here are explorer's listings
        <Box>
            {prevlistings.length > 0 ? (
                prevlistings.map((listing) => (
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
                            Budget: {'$ '}
                            {listing.budgetAmount}
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
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={() => onDeleteListing(listing._id)}
                        >
                            Delete Listing
                        </Button>
                    </Box>
                ))
            ) : (
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        color: mode === 'light' ? lMode1 : dMode2,
                        font: '600 1.5rem Poppins, sans-serif',
                    }}
                >
                    {prevlistings.length}
                </Typography>
            )}
        </Box>
    );
};

export default ExplorerListings;
