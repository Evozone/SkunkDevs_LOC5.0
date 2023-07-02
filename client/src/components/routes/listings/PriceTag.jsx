// React
import React from 'react';

// Material UI
import { Chip } from '@mui/material';

// MUI icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function PriceTag({ price }) {
    return (
        <Chip
            icon={<AttachMoneyIcon />}
            label={`${price}`}
            sx={{ ml: 1 }}
            color='success'
            variant='outlined'
        />
    );
}
