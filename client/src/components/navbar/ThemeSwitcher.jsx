// React
import React, { useEffect, useState } from 'react';

// Local Icons
import LightModeIcon from '../../assets/sun.svg';
import DarkModeIcon from '../../assets/moon.svg';

// Material UI Utils
import { styled } from '@mui/material/styles';

// Material UI components
import Swtich from '@mui/material/Switch';

const ThemeSwitch = styled(Swtich)(({ theme }) => ({
    width: 70,
    height: 50,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 9,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            '& .MuiSwitch-thumb:before': {
                background: `url(${DarkModeIcon}) no-repeat center center`,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: 'transparent',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background: `url(${LightModeIcon}) no-repeat center center`,
            border: '2px solid #fff',
            borderRadius: '50%',
        },
    },
    '& .MuiSwitch-track': {
        border: '2px solid #fff',
        backgroundColor: 'transparent',
        borderRadius: 50 / 2,
    },
    '.Mui-checked+ .MuiSwitch-track': {
        backgroundColor: 'transparent',
    },
}));

export default function ThemeSwitcher({ mode, themeChange }) {
    return <ThemeSwitch checked={mode === 'dark'} onChange={themeChange} />;
}
