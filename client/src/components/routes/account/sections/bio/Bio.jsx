// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import {
    Stack,
    FormControl,
    TextField,
    Grid,
    InputAdornment,
    Typography,
    Divider,
} from '@mui/material';

// Material UI Icons
import {
    AccountCircle,
    Twitter,
    Instagram,
    Pinterest,
} from '@mui/icons-material';

// External Packages
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    startLoading,
    stopLoading,
} from '../../../../../features/loading/loadingSlice';
import RoleSwitch from './RoleSwtich';

// Arrays
const socials = [
    { name: 'portfolio', icon: <AccountCircle /> },
    { name: 'twitter', icon: <Twitter /> },
    { name: 'instagram', icon: <Instagram /> },
    { name: 'pinterest', icon: <Pinterest /> },
];

export default function Bio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (currentUser.isSignedIn) {
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
        }
    }, [currentUser]);

    console.log(formData);

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

            <FormControl sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <TextField
                            id='bio'
                            label='Bio'
                            placeholder='Tell us about yourself!'
                            variant='outlined'
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    bio: e.target.value,
                                })
                            }
                            multiline
                            rows={9}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            {socials.map((link) => (
                                <TextField
                                    key={link.name}
                                    value={formData.socialLinks[link.name]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            socialLinks: {
                                                ...formData.socialLinks,
                                                [link.name]: e.target.value,
                                            },
                                        })
                                    }
                                    id={link.name}
                                    placeholder={
                                        link.name.charAt(0).toUpperCase() +
                                        link.name.slice(1)
                                    }
                                    variant='standard'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                {link.icon}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                            <TextField
                                id='location'
                                label='Location'
                                placeholder='Where are you from?'
                                variant='standard'
                                value={formData.location}
                                size='small'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <RoleSwitch
                            role={formData.role}
                            roleChange={() => {
                                setFormData({
                                    ...formData,
                                    role:
                                        formData.role === 'photographer'
                                            ? 'client'
                                            : 'photographer',
                                });
                            }}
                        />
                    </Grid>
                </Grid>
            </FormControl>
        </>
    );
}
