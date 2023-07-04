// React
import React, { useState, useEffect } from 'react';

// Material UI
import { FormControl, Grid, Typography, TextField, Stack } from '@mui/material';

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
import { StyledButton } from '../../../../helpers/StyledMUI';

export default function Profile() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: currentUser.name || '',
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        socialLinks: {
            twitter: '',
            instagram: '',
            pinterest: '',
            portfolio: '',
        },
        location: {
            city: '',
            country: '',
            cityId: null,
            loc: null,
        },
        role: '',
        skill_level: 'beginner',
    });

    const setFormWithCurrentUser = () => {
        // Update formData with currentUser data
        setFormData({
            ...formData,
            name: currentUser.name,
            username: currentUser.username,
            bio: currentUser.bio || '',
            socialLinks: {
                twitter: currentUser.socialLinks?.twitter || '',
                instagram: currentUser.socialLinks?.instagram || '',
                pinterest: currentUser.socialLinks?.pinterest || '',
                portfolio: currentUser.socialLinks?.portfolio || '',
            },
            location: {
                city: currentUser.location?.city || '',
                country: currentUser.location?.country || '',
                cityId: currentUser.location?.cityId || null,
                loc: currentUser.location?.loc || null,
            },
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

    // Array of buttons to be rendered
    const buttons = [
        { name: 'Save Changes', color: 'success', type: 'submit' },
        { name: 'Cancel', color: 'primary', onClick: handleCancel },
    ];

    // Array of name related fields
    const fields = [
        { id: 'name', label: 'Name', xs: 5 },
        { id: 'username', label: 'Username', xs: 7 },
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

            <FormControl
                sx={{ width: '100%' }}
                component='form'
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>
                    {/* Names */}
                    {fields.map((field) => (
                        <Grid item xs={field.xs} key={field.id}>
                            <TextField
                                id={field.id}
                                label={field.label}
                                variant='outlined'
                                fullWidth
                                value={formData[field.id]}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [field.id]: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    ))}

                    {/* Bio */}
                    <Grid item xs={5}>
                        <Bio {...{ formData, setFormData }} />
                    </Grid>

                    {/* Social Links and Location */}
                    <Grid item xs={7}>
                        <SocialStack {...{ formData, setFormData }} />
                    </Grid>

                    {/* Role */}
                    <Grid item xs={12}>
                        <RoleSwitch {...{ formData, setFormData }} />
                    </Grid>

                    {/* Buttons */}
                    <Grid item xs={12}>
                        <Stack
                            direction='row'
                            spacing={2}
                            justifyContent='flex-end'
                        >
                            {buttons.map((button) => (
                                <StyledButton
                                    key={button.name}
                                    {...button}
                                    variant='outlined'
                                >
                                    {button.name}
                                </StyledButton>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    );
}
