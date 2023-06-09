// React
import React from 'react';

// Material UI
import { Select, MenuItem } from '@mui/material';

const categories = [
    'Everything',
    'Free',
    'Standard',
    'Collections',
    'Photographers',
];

export default function CategorySelect({
    category,
    setCategory,
    lightModeColor,
}) {
    return (
        <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size='small'
            sx={{
                color: lightModeColor,
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: lightModeColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: lightModeColor,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: lightModeColor,
                },
                '.MuiSvgIcon-root ': {
                    fill: lightModeColor,
                },
            }}
        >
            {categories.map((category) => (
                <MenuItem key={category} value={category}>
                    {category}
                </MenuItem>
            ))}
        </Select>
    );
}
