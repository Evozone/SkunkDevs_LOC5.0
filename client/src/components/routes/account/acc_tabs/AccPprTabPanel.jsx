// React
import React from 'react';

// Material UI
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function AccPprTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`account-paper-tabpanel-${index}`}
            aria-labelledby={`account-paper-tab-${index}`}
            {...other}
            style={{ flexGrow: 1 }}
        >
            {value === index && (
                <Box sx={{ p: 3, height: '60vh', overflowY: 'auto' }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

AccPprTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
