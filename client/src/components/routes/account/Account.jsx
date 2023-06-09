// React
import React from 'react';

// Material UI
import { Box } from '@mui/material';

import AccountPaper from './AccountPaper';

export default function Account() {
    return (
        <Box className='route-container'>
            <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
                <AccountPaper />
            </Box>
        </Box>
    );
}
