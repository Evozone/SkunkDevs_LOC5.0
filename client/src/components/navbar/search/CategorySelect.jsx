// React
import React from 'react';

// Material UI
import { Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../../features/explore/exploreSlice';

const categories = [
    // 'Everything',
    'free',
    'premium',
    //'Collections
    'photographers',
];

export default function CategorySelect({ lightModeColor }) {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.explore.category);
    return (
        <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={category}
            // onChange={(e) => setFilters(e.target.value)}
            //I want to dispatch an action here
            onChange={(e) =>
                dispatch(changeFilter({ category: e.target.value }))
            }
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
