// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material-UI
import { Stack } from '@mui/material';

// Custom Components
import { StyledButton } from '../../../../helpers/StyledMUI';

export default function AL_Buttons({ setListingData }) {
    const currentUser = useSelector((state) => state.auth);

    // Clear the Listing Form
    const clearForm = (e) => {
        e.preventDefault();
        setListingData({
            title: '',
            description: '',
            currency: 'USD',
            budget: 0,
            location: {
                cityId: currentUser.location.cityId,
                city: currentUser.location.city,
                country: currentUser.location.country,
                loc: {
                    type: currentUser.location.loc.type,
                    coordinates: currentUser.location.loc.coordinates,
                },
            },
            tags: [],
            fromDateTime: null,
            toDateTime: null,
        });
    };
    return (
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <StyledButton type='submit' variant='outlined' color='success'>
                Submit
            </StyledButton>
            <StyledButton variant='outlined' onClick={clearForm}>
                Clear
            </StyledButton>
        </Stack>
    );
}
