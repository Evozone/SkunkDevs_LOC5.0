// React
import React from 'react';

// Material-UI Components
import { IconButton, Typography } from '@mui/material';

// Material-UI Icons
import CancelIcon from '@mui/icons-material/Cancel';

export default function ASD_Head({ handleClose, title }) {
    return (
        <>
            {' '}
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                }}
            >
                <CancelIcon />
            </IconButton>
            <Typography
                variant='h4'
                sx={{
                    fontFamily: 'Geologica, sans-serif',
                    fontWeight: 'bold',
                    mb: '1rem',
                }}
            >
                {title}
            </Typography>
        </>
    );
}
