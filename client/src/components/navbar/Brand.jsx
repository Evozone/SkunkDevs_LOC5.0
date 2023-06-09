// React
import React from 'react';

// Material UI
import { Typography } from '@mui/material';

export default function Brand({ lightModeColor }) {
    return (
        <Typography
            variant='h6'
            className='brand-font'
            color={lightModeColor}
            sx={{
                mr: 2,
                cursor: 'pointer',
                font: 'bold 1.5rem Reem Kufi, sans-serif',
            }}
            onClick={() => handleNavigation('')}
        >
            ShutterSpaces
        </Typography>
    );
}
