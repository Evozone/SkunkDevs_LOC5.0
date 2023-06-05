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

export default function CategorySelect({ category, setCategory }) {
    return (
        <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size='small'
        >
            {categories.map((category) => (
                <MenuItem key={category} value={category}>
                    {category}
                </MenuItem>
            ))}
        </Select>
    );
}
