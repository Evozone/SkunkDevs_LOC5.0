// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { Typography } from '@mui/material';

export default function Brand({ lightModeColor }) {
    const navigate = useNavigate();
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
            onClick={() => navigate('/')}
        >
            ShutterSpaces
        </Typography>
    );
}
