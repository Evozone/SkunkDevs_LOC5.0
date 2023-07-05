// React
import React, { useState } from 'react';

// Material UI
import { Typography, Autocomplete, TextField, Stack } from '@mui/material';

// External Libraries
import currencyCodes from 'currency-codes';

// Get the list of valid currency codes
const currencies = currencyCodes.codes();

export default function AL_Budget({
    listingData,
    handleChange,
    setListingData,
}) {
    const [currency, setCurrency] = useState('USD');

    return (
        <>
            <Typography id='budget-slider' gutterBottom>
                Budget
            </Typography>
            <Stack spacing={2} direction='row' alignItems='center'>
                <Autocomplete
                    options={currencies}
                    value={currency || ''}
                    freeSolo
                    name='currency'
                    onChange={(e, newValue) => {
                        setCurrency(newValue);
                        setListingData({
                            ...listingData,
                            currency: newValue,
                        });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Currency'
                            variant='outlined'
                            required
                        />
                    )}
                    sx={{ width: '50%' }}
                />
                <TextField
                    id='budget'
                    label='Budget'
                    type='number'
                    name='budget'
                    value={listingData.budget || ''}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant='outlined'
                    required
                    sx={{ width: '50%' }}
                />
            </Stack>
        </>
    );
}
