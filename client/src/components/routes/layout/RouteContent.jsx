//React
import React from 'react';

// Material UI
import { Box } from '@mui/material';

export default function RouteContent({ children }) {
    return (
        <Box
            sx={{
                minHeight: '65vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                backgroundColor: 'background.paper',
            }}
        >
            {children}
        </Box>
    );
}
