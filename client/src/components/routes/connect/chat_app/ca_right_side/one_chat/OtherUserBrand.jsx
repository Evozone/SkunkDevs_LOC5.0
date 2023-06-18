// React
import React from 'react';

// MUI components
import { Avatar, Box, Typography, Stack } from '@mui/material';

export default function OtherUserBrand({ otherUser, typing }) {
    return (
        <Stack direction='row' spacing={1} alignItems='center'>
            <Avatar
                alt={otherUser.name.charAt(0).toUpperCase()}
                src={otherUser.avatar}
                sx={{ height: 50, width: 50 }}
            >
                {otherUser.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: 'block' }}>
                <Typography sx={{ font: '400 1rem Geologica, sans-serif' }}>
                    {otherUser.name}
                </Typography>
                <Typography sx={{ fontWeight: '300', fontSize: '0.8rem' }}>
                    {typing ? 'typing...' : 'u/' + otherUser.username}
                </Typography>
            </Box>
        </Stack>
    );
}
