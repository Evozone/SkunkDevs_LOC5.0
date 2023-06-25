// React
import React from 'react';

// Material UI
import { Box, Stack, Typography } from '@mui/material';

// Other Components
import AddListing from './AddListing';

export default function ExplorerListings() {
    return (
        <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={2}
            sx={{ width: '100%' }}
        >
            <AddListing />
            <Box>
                <Typography variant='h6'>Your Listings</Typography>
            </Box>
        </Stack>
    );
}
