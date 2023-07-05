// React
import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../../../features/notify/notifySlice';

// Material UI
import { Paper, FormControl, Typography, Stack } from '@mui/material';

// Material UI Icons
import PostAddIcon from '@mui/icons-material/PostAdd';

// External Libraries
import axios from 'axios';

// Custom Components
import AL_TextInput from './AL_TextInput';
import AL_Location from './AL_Location';
import AL_Buttons from './AL_Buttons';
import AL_Tags from './AL_Tags';
import AL_Time from './AL_Time';
import AL_Budget from './AL_Budget';

export default function AddListing({ fetchListings }) {
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
            fetchListings();
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
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'primary.main',
            }}
        >
            <Typography
                variant='h5'
                sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
            >
                <PostAddIcon sx={{ mr: 1 }} />
                Create a Job Listing
            </Typography>
            <FormControl
                fullWidth
                component='form'
                onSubmit={handleListingSubmit}
            >
                <Stack spacing={2}>
                    <AL_TextInput {...{ listingData, handleChange }} />
                    <AL_Budget
                        {...{ listingData, handleChange, setListingData }}
                    />
                    <AL_Location {...{ listingData, setListingData }} />
                    <AL_Tags {...{ listingData, handleChange }} />
                    <AL_Time {...{ listingData, handleChange }} />
                    <AL_Buttons {...{ handleListingSubmit, setListingData }} />
                </Stack>
            </FormControl>
        </Paper>
    );
}
