import React, { useState } from 'react';

// Material UI
import { FormControl } from '@mui/material';
import CategorySelect from './CategorySelect';
import SearchBar from './SearchBar';

export default function GlobalSearch({ lightModeColor }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Free');

    const handleSearch = () => {
        console.log('searching for', search, 'in', category);
    };

    const mode = window.localStorage.getItem('photoAppTheme') || 'light';
    const givenColor =
        mode === 'dark' || lightModeColor === 'white' ? 'white' : 'black';

    return (
        <FormControl
            sx={{
                mx: 1,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // The first child has border radius on the left
                '& > *:first-of-type': {
                    borderRadius: '2rem 0 0 2rem',
                },
                // The last child has border radius on the right
                '& > *:last-child': {
                    borderRadius: '0 2rem 2rem 0',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: `1px solid ${givenColor}`,
                    },
                    '&:hover fieldset': {
                        border: `1px solid ${givenColor}`,
                    },
                    '&.Mui-focused fieldset': {
                        border: `1px solid ${givenColor}`,
                    },
                },
            }}
        >
            <CategorySelect {...{ category, setCategory, lightModeColor }} />
            <SearchBar
                {...{ search, setSearch, handleSearch, lightModeColor }}
            />
        </FormControl>
    );
}
