// React
import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    startLoading,
    stopLoading,
} from '../../../../features/loading/loadingSlice';

// Material UI
import { Divider, Stack } from '@mui/material';

// External Libraries
import axios from 'axios';

// Other Components
import AddListing from './add_job/AddListing';
import YourListings from './YourListings';

export default function ExplorerListings() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);

    const [listings, setListings] = useState([]);
    const [anyListings, setAnyListings] = useState(false);

    const fetchListings = async () => {
        dispatch(startLoading());
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/listings?authorId=${
                    currentUser.uid 
                }`
            );
            setListings(res.data.result);
            setAnyListings(res.data.result.length > 0);
        } catch (err) {
            console.log(err);
        }
        dispatch(stopLoading());
    };
    return (
        <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={2}
            sx={{ width: '100%' }}
        >
            <YourListings
                {...{ listings, setListings, fetchListings, anyListings }}
            />
            <AddListing {...{ fetchListings }} />
        </Stack>
    );
}
