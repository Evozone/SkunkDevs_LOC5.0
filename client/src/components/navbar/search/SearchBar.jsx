// React
import React from 'react';

// Material UI
import { TextField, InputAdornment, IconButton } from '@mui/material';

// Material UI Icons
import { Search } from '@mui/icons-material';

export default function SearchBar({ search, setSearch, handleSearch }) {
    return (
        <TextField
            id='outlined-basic'
            variant='outlined'
            size='small'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
            sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                    borderRadius: '0 2rem 2rem 0',
                },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            edge='end'
                            aria-label='search'
                            onClick={handleSearch}
                        >
                            <Search />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
