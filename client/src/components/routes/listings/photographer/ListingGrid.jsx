// React
import React from 'react';

// Material UI
import { Box, Grid } from '@mui/material';
import PhListCard from './PhListCard';

export default function ListingGrid({ listings }) {
    return (
        // Dotted Box
        <Box sx={{ border: '2px dotted grey', borderRadius: 3, p: 2 }}>
            <Grid container spacing={2}>
                {listings.map((listing) => (
                    <Grid item xs={12} sm={6} md={4} key={listing._id}>
                        <PhListCard {...{ listing }} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
