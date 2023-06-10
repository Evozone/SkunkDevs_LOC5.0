// React
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Material UI
import { Box } from '@mui/material';

// Icons
import {
    Person as PersonIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

// Components
import AccPprTabPanel from './AccPprTabPanel';
import Profile from '../sections/profile/Profile';
import Settings from '../sections/Settings';
import { StyledTabs, StyledTab } from './CustomTabs';

// Tab Panel Props
function allyProps(index) {
    return {
        id: `account-paper-tab-${index}`,
        'aria-controls': `account-paper-tabpanel-${index}`,
    };
}

const tabs = [
    { label: 'Profile', icon: <PersonIcon />, component: <Profile /> },
    { label: 'Settings', icon: <SettingsIcon />, component: <Settings /> },
];

export default function AccountTabs() {
    const location = useLocation();
    let tabValue = 0;
    if (location.state && location.state.tab) {
        tabValue = tabs.findIndex((tab) => tab.label === location.state.tab);
    }

    const [value, setValue] = useState(tabValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: '100%',
                flexGrow: 1,
                display: 'flex',
            }}
            elevation={16}
        >
            <StyledTabs
                orientation='vertical'
                value={value}
                onChange={handleChange}
                aria-label='Your Account Tabs'
                sx={{
                    flex: '0 0 10rem',
                    borderRight: 1,
                    borderColor: 'divider',
                }}
            >
                {tabs.map((tab, index) => (
                    <StyledTab
                        key={index}
                        label={tab.label}
                        {...allyProps(index)}
                        icon={tab.icon}
                        iconPosition='start'
                        sx={{ minHeight: '60px' }}
                    />
                ))}
            </StyledTabs>
            {tabs.map((tab, index) => (
                <AccPprTabPanel key={index} value={value} index={index}>
                    {tab.component}
                </AccPprTabPanel>
            ))}
        </Box>
    );
}
