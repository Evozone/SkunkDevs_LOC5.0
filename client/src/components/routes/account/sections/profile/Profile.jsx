// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { FormControl, Grid, Typography, Button, Stack } from '@mui/material';

// External Packages
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    startLoading,
    stopLoading,
} from '../../../../../features/loading/loadingSlice';
import { notify } from '../../../../../features/notify/notifySlice';
import { updateCurrentUser } from '../../../../../features/auth/authSlice';

// Custom Components
import RoleSwitch from './RoleSwtich';
import SocialStack from './SocialStack';
import Bio from './Bio';

export default function Profile() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        bio: currentUser.bio || '',
        socialLinks: {
            twitter: '',
            instagram: '',
            pinterest: '',
            portfolio: '',
        },
        location: '',
        role: '',
        skill_level: 'beginner',
    });

    const setFormWithCurrentUser = () => {
        // Update formData with currentUser data
        setFormData({
            ...formData,
            bio: currentUser.bio || '',
            socialLinks: {
                twitter: currentUser.socialLinks?.twitter || '',
                instagram: currentUser.socialLinks?.instagram || '',
                pinterest: currentUser.socialLinks?.pinterest || '',
                portfolio: currentUser.socialLinks?.portfolio || '',
            },
            location: currentUser.location || '',
            role: currentUser.role || '',
            skill_level: currentUser.skill_level || '',
        });
    };

    useEffect(() => {
        if (currentUser.isSignedIn) {
            // Update formData with currentUser data
            setFormWithCurrentUser();
        }
    }, [currentUser]);

    const handleCancel = (e) => {
        e.preventDefault();
        setFormWithCurrentUser();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(startLoading());

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_SERVER_URL}/api/users/${
                    currentUser.uid
                }`,
                formData,
                config
            );
            dispatch(stopLoading());
            dispatch(updateCurrentUser({ ...data.result }));
            dispatch(
                notify({ open: true, severity: 'success', message: 'Saved!' })
            );
        } catch (error) {
            dispatch(stopLoading());
            dispatch(
                notify({
                    open: true,
                    severity: 'error',
                    message: error.message,
                })
            );
        }
    };

    const buttons = [
        { name: 'Save Changes', color: 'success', onClick: handleSubmit },
        { name: 'Cancel', color: 'primary', onClick: handleCancel },
    ];

    return (
        <>
            <Typography
                variant='h4'
                sx={{
                    fontFamily: 'Geologica, sans-serif',
                    display: 'flex',
                    mb: 3,
                }}
            >
                Your Profile
            </Typography>

            <FormControl sx={{ width: '100%' }} component='form'>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Bio {...{ formData, setFormData }} />
                    </Grid>
                    <Grid item xs={7}>
                        <SocialStack {...{ formData, setFormData }} />
                    </Grid>
                    <Grid item xs={12}>
                        <RoleSwitch {...{ formData, setFormData }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack
                            direction='row'
                            spacing={2}
                            justifyContent='flex-end'
                        >
                            {buttons.map((button) => (
                                <Button
                                    key={button.name}
                                    {...button}
                                    variant='contained'
                                >
                                    {button.name}
                                </Button>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    );
}
