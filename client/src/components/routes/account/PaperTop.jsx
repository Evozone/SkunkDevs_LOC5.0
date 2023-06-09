// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Box, Avatar, Typography } from '@mui/material';

export default function PaperTop() {
    const currentUser = useSelector((state) => state.auth);

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                px: 3,
                borderRadius: 3,
                borderBottom: 'solid',
                borderBottomWidth: 1,
            }}
        >
            {/* Profile pic */}
            <Avatar
                sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: 'background.paper',
                    borderColor: 'primary.main',
                    border: '5px solid',

                    position: 'absolute',
                    top: -45,
                    left: 30,
                }}
                src={currentUser.avatar}
                alt={currentUser.name}
            />
            <Typography
                variant='h4'
                sx={{
                    my: 3,
                    fontFamily: 'Geologica, sans-serif',
                }}
            >
                Welcome, {currentUser.name}!
            </Typography>
        </Box>
    );
}
