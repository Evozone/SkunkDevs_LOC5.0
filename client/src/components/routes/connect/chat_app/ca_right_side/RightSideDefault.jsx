// React
import React from 'react';

// Material UI
import { Box, Typography } from '@mui/material';

export default function RightSideDefault() {
    const mode = window.localStorage.getItem('photoAppTheme');

    return (
        <Box
            sx={{
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={
                    mode === 'light'
                        ? 'assets/vectors/chat-default-black.svg'
                        : 'assets/vectors/chat-default-white.svg'
                }
                alt='Logo when no user is selected'
                style={{ width: '250px', height: '250px' }}
            />
            <Typography
                variant='h5'
                color='textSecondary'
                sx={{ fontFamily: 'Geologica, sans-serif', mt: 2 }}
            >
                Connect with photographers!
            </Typography>
        </Box>
    );
}
