// React
import React from 'react';

// Material UI
import { TextField } from '@mui/material';

export default function AL_TextInput({ listingData, handleChange }) {
    return (
        <>
            <TextField
                label='Title'
                variant='outlined'
                name='title'
                value={listingData.title}
                onChange={handleChange}
                inputProps={{ maxLength: 20 }}
                required
            />
            <TextField
                label='Description'
                variant='outlined'
                name='description'
                value={listingData.description}
                onChange={handleChange}
                inputProps={{ maxLength: 100 }}
                multiline
                rows={3}
                required
            />
        </>
    );
}
