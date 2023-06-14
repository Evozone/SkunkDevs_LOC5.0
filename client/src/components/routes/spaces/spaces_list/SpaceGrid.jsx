// React
import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import {
    startLoading,
    stopLoading,
} from '../../../../features/loading/loadingSlice';
import { notify } from '../../../../features/notify/notifySlice';

// Material UI
import { Grid } from '@mui/material';

// External Packages
import axios from 'axios';
import SpaceCard from './SpaceCard';

export default function SpaceGrid({ spaces, setSpaces }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const getSpaces = async () => {
            dispatch(startLoading());
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/rooms`
                );
                setSpaces(res.data.result);
            } catch (error) {
                dispatch(
                    notify(
                        true,
                        'error',
                        'It seems something is wrong, please log out and log in again. in a minute :('
                    )
                );
                console.log(error);
            }
            dispatch(stopLoading());
        };
        getSpaces();
    }, []);

    return (
        <Grid container spacing={2}>
            {spaces &&
                spaces.map((space) => (
                    <SpaceCard key={space._id} {...{ space }} />
                ))}
        </Grid>
    );
}
