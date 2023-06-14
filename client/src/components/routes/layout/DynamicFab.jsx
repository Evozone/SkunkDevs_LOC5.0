// React
import React, { useState, useEffect } from 'react';

// Material-UI Components
import Fab from '@mui/material/Fab';

export default function DynamicFab({ onClick, icon, label }) {
    const [variant, setVariant] = useState('default');

    const handleMouseOver = () => {
        setVariant('extended');
    };

    const handleMouseOut = () => {
        setVariant('default');
    };

    return (
        <Fab
            variant={variant}
            color='primary'
            aria-label={label}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
            }}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {icon}
            {variant === 'extended' && <span>&nbsp;&nbsp;</span>}
            {variant === 'extended' && label}
        </Fab>
    );
}
