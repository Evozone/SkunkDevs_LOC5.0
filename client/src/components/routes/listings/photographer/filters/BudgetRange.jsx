// React
import React, { useState, useEffect } from 'react';

// Material UI
import { Box, Slider, Typography } from '@mui/material';

export default function BudgetRange({ filters, handleFilterChange }) {
    const [value, setValue] = useState([
        filters.budgetStart,
        filters.budgetEnd,
    ]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        handleFilterChange({
            target: {
                name: 'budgetStart',
                value: value[0],
            },
        });
        handleFilterChange({
            target: {
                name: 'budgetEnd',
                value: value[1],
            },
        });
    }, [value]);

    return (
        <Box>
            <Typography id='range-slider' gutterBottom>
                Budget range
            </Typography>
            <Box sx={{ p: 2 }}>
                <Slider
                    getAriaLabel={() => 'Budget range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    min={0}
                    max={10000}
                    step={100}
                    marks={[
                        { value: 0, label: '0' },
                        { value: 10000, label: '10K' },
                    ]}
                />
            </Box>
        </Box>
    );
}
