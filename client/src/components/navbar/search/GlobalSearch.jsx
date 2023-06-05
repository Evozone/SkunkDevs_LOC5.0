import React, { useState } from 'react';

// Material UI
import { FormControl } from '@mui/material';
import CategorySelect from './CategorySelect';
import SearchBar from './SearchBar';

export default function GlobalSearch() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Free');

    const handleSearch = () => {
        console.log('searching for', search, 'in', category);
    };

    return (
        <FormControl
            sx={{
                mx: 1,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // The first child has border radius on the left
                '& > *:first-child': {
                    borderRadius: '2rem 0 0 2rem',
                },
                // The last child has border radius on the right
                '& > *:last-child': {
                    borderRadius: '0 2rem 2rem 0',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: '1px solid white',
                    },
                    '&:hover fieldset': {
                        border: '1px solid white',
                    },
                    '&.Mui-focused fieldset': {
                        border: '2px solid white',
                    },
                },
            }}
        >
            <CategorySelect {...{ category, setCategory }} />
            <SearchBar {...{ search, setSearch, handleSearch }} />
        </FormControl>
    );
}
