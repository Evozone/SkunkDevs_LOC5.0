// React
import React from 'react';

// Material UI
import { Box, Typography, Avatar, Stack } from '@mui/material';

export default function ProfileHeader({ user }) {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <Box
            sx={{
                minHeight: '35vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0 2rem',
            }}
        >
            <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ mt: '2.5rem', width: 100, height: 100 }}
            >
                {user?.name?.charAt(0)}
            </Avatar>
            <Stack spacing={0} sx={{ ml: '2rem', mt: '2.5rem' }}>
                <Typography
                    variant='h2'
                    sx={{
                        font: 'bold 4rem Geologica, sans-serif',
                        color: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {user?.name}
                </Typography>
                <Typography variant='h6' sx={{ color: 'common.white' }}>
                    {`${capitalizeFirstLetter(
                        user?.skill_level || ''
                    )} ${capitalizeFirstLetter(user?.role || '')}  | ${
                        user?.username
                    }`}
                </Typography>
            </Stack>
        </Box>
    );
}
