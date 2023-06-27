// React
import React, { useState } from 'react';

// Material UI
import {
    Typography,
    Slider,
    Autocomplete,
    TextField,
    Stack,
} from '@mui/material';

// External Libraries
import currencyCodes from 'currency-codes';

// Get the list of valid currency codes
const currencies = currencyCodes.codes();

export default function AL_BudgetSlider({
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
                <Slider
                    aria-label='Budget'
                    name='budget'
                    valueLabelDisplay='auto'
                    value={listingData.budget}
                    onChange={handleChange}
                    step={100}
                    min={0}
                    max={10000}
                    required
                    marks={[
                        { value: 0, label: '0' },
                        { value: 10000, label: '10K' },
                    ]}
                />
            </Stack>
        </>
    );
}
