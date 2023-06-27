// React
import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../../features/notify/notifySlice';

// Material UI
import { Paper, FormControl, Typography, Stack } from '@mui/material';

// External Libraries
import axios from 'axios';

// Custom Components
import { StyledButton } from '../../../helpers/StyledMUI';
import AL_TextInput from './add_job/AL_TextInput';
import AL_BudgetSlider from './add_job/AL_BudgetSlider';
import AL_Location from './add_job/AL_Location';
import AL_Buttons from './add_job/AL_Buttons';
import AL_Tags from './add_job/AL_Tags';
import AL_Time from './add_job/AL_Time';

export default function AddListing() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);

    const [listingData, setListingData] = useState({
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
        fromDateTime: '',
        toDateTime: '',
    });

    const handleChange = (e) => {
        setListingData({ ...listingData, [e.target.name]: e.target.value });
    };

    const handleListingSubmit = async (e) => {
        e.preventDefault();

        const dnd = window.localStorage.getItem('photoApp');

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/listings`,
                listingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${dnd}`,
                    },
                }
            );
            if (res.status === 201) {
                dispatch(
                    notify({
                        open: true,
                        severity: 'success',
                        message: 'Listing created successfully',
                    })
                );
            }
        } catch (err) {
            console.log(err);
            dispatch(
                notify({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong, please try again later',
                })
            );
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, width: '400px', borderRadius: 3 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
                Add a Listing
            </Typography>
            <FormControl
                fullWidth
                component='form'
                onSubmit={handleListingSubmit}
            >
                <Stack spacing={2}>
                    <AL_TextInput {...{ listingData, handleChange }} />
                    <AL_BudgetSlider
                        {...{ listingData, handleChange, setListingData }}
                    />
                    <AL_Location {...{ listingData, setListingData }} />
                    <AL_Tags {...{ listingData, setListingData }} />
                    <AL_Time {...{ listingData, setListingData }} />
                    <AL_Buttons {...{ handleListingSubmit, setListingData }} />
                </Stack>
            </FormControl>
        </Paper>
    );
}
