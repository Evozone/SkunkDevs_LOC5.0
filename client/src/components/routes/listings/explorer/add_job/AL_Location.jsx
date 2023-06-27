// React
import React, { useState } from 'react';

// Material-UI
import { TextField, Autocomplete, Stack, Typography } from '@mui/material';

// MUI Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

// External Libraries
import axios from 'axios';

export default function AL_Location({ listingData, setListingData }) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    const [cities, setCities] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const fetchCities = async (searchTerm) => {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/cities?search=${searchTerm}`
            );
            setCities(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const onInputChange = async (event, value) => {
        setInputValue(value);
        const searchTerm = value.trim();
        if (searchTerm && searchTerm.length > 3) {
            fetchCities(searchTerm);
        } else {
            setCities([]);
        }
    };

    const handleLocationChange = (event, value) => {
        setSelectedCity(value);
        if (value) {
            setListingData({
                ...listingData,
                location: {
                    cityId: value.cityId,
                    city: value.name,
                    country: value.country,
                    loc: value.loc,
                },
            });
        }
    };

    return (
        <Stack spacing={2}>
            <Typography id='location-title'>Location</Typography>
            <Typography
                variant='h6'
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    font: '400 1rem Geologica, sans-serif',
                }}
            >
                <LocationOnIcon sx={{ mr: 1 }} fontSize='large' />
                {listingData.location.city},{' '}
                {regionNames.of(listingData.location.country)}
            </Typography>
            <Autocomplete
                fullWidth
                id='location'
                options={cities}
                onInputChange={onInputChange}
                getOptionLabel={(option) => {
                    if (option.country) {
                        return `${option.name}, ${regionNames.of(
                            option.country
                        )}`;
                    } else {
                        return option.name || '';
                    }
                }}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Location'
                        placeholder='Where is the job located?'
                        variant='outlined'
                        size='small'
                    />
                )}
                inputValue={inputValue}
                value={selectedCity}
                onChange={handleLocationChange}
            />
        </Stack>
    );
}
