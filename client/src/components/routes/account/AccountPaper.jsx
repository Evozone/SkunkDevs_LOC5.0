// React
import React from 'react';

// Material UI
import { Paper } from '@mui/material';

// Components
import PaperTop from './PaperTop';
import AccountTabs from './acc_tabs/AccountTabs';

const mode = window.localStorage.getItem('photoAppTheme') || 'light';

const paperStyles = {
    opacity: 0.85,
    mt: 10,
    minHeight: '80vh',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
};

export default function AccountPaper() {
    return (
        <Paper sx={paperStyles} elevation={16}>
            {/* Box with Profile pic and welcome name */}
            <PaperTop />
            <AccountTabs />
        </Paper>
    );
}
