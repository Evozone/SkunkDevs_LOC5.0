// React
import React from 'react';
import { useLocation } from 'react-router-dom';

// Material UI Components
import { Paper, Typography } from '@mui/material';

export default function RoomInfo() {
    const location = useLocation();

    const space = location.state.space;

    return (
        <Paper
            sx={{
                p: 2,
                mb: '1rem',
                borderRadius: 5,
                backgroundColor: 'transparent',
                border: '2px solid #fff',
                flexGrow: 1,
            }}
        >
            <Typography
                variant='h4'
                sx={{ fontFamily: 'Geologica, sans-serif' }}
                color='white'
            >
                {space.title}
            </Typography>
            <Typography variant='subtitle2' color='grey' sx={{ mt: 1 }}>
                by {`${space.createdByUsername}`}
            </Typography>
            <Typography
                variant='body1'
                sx={{
                    font: '400 1rem/1.5rem Work Sans, sans-serif',
                    mt: 1,
                }}
                color='white'
            >
                {space.description}
            </Typography>
        </Paper>
    );
}
