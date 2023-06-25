// React
import React from 'react';

// Material UI
import { Box, Paper, FormControl, Typography } from '@mui/material';

export default function AddListing() {
    return (
        <Paper elevation={3} sx={{ p: 2, width: '30%', borderRadius: 3 }}>
            <Typography variant='h6'>List a Job Listing</Typography>
            <FormControl fullWidth>
                <Box>Filter</Box>
            </FormControl>
        </Paper>
    );
}
