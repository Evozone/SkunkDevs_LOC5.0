// React
import React from 'react';

// Material UI
import { styled } from '@mui/material/styles';
import { Tabs, Tab } from '@mui/material';

// Mode

export const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className='MuiTabs-indicatorSpan' />,
        }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        marginTop: '1rem',
        maxHeight: 30,
        width: '100%',
        backgroundColor: 'skyblue',
    },
});

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
    })
);
