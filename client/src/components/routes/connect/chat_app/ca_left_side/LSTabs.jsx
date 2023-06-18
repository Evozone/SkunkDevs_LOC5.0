// React
import React from 'react';

// Material UI
import { AppBar, Tab, Tabs } from '@mui/material';

// Icons
import { Chat, PersonSearch, Settings } from '@mui/icons-material';

// Array of objects
const tabs = [
    { icon: <Chat sx={{ fontSize: '34px' }} /> },
    { icon: <PersonSearch sx={{ fontSize: '34px' }} /> },
    { icon: <Settings sx={{ fontSize: '34px' }} /> },
];

export default function LSTabs({ value, handleTabChange }) {
    const mode = window.localStorage.getItem('photoAppTheme');

    return (
        <AppBar
            elevation={0}
            color='inherit'
            position='static'
            sx={{
                p: 1,
            }}
        >
            <Tabs
                sx={{
                    alignItems: 'center',
                    backgroundColor: mode === 'light' ? 'grey.300' : 'grey.900',
                    borderRadius: 3,
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'primary.light',
                    },
                }}
                value={value}
                onChange={handleTabChange}
                textColor='inherit'
                variant='fullWidth'
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        icon={tab.icon}
                        sx={{
                            borderRight:
                                index !== 2 ? '1px solid grey' : 'none',
                        }}
                    />
                ))}
            </Tabs>
        </AppBar>
    );
}
