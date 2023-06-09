// React
import React from 'react';

// MUI Components
import { Box, Typography } from '@mui/material';

// Styled Components
import { StyledSwitch } from '../../../../helpers/StyledMUI';

export default function RoleSwitch({ role, roleChange }) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '1rem',
                alignItems: 'center',
            }}
        >
            <Typography
                variant='h6'
                sx={{
                    font: '400 1rem Geologica, sans-serif',
                }}
            >
                I am a photographer:
            </Typography>
            <StyledSwitch
                checked={role === 'photographer'}
                onChange={roleChange}
                name='role'
                inputProps={{ 'aria-label': 'role switch' }}
            />
        </Box>
    );
}
