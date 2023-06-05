import React, { useState, useEffect } from 'react';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import jwtDecode from 'jwt-decode';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

import { lMode1, lMode3, lMode6 } from '../../../utils/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../../../features/auth/authSlice';
import {
    startLoading,
    stopLoading,
} from '../../../features/loading/loadingSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get token from Google, passed from GoogleOneTapLogin in state
    const location = useLocation();
    let token = location?.state?.token;
    if (!token) {
        const auth = window.localStorage.getItem('photoApp');
        // Reassign token to the token from localStorage
        token = jwtDecode(auth);
    }

    // To fill the form with the data from the token
    const { sub: uid, email, name, picture } = jwtDecode(token);
    // Change picture from s-96 to s-512
    const avatar = picture.replace('s96-c', 's512-c');
    const username = email.split('@')[0];

    const [formData, setFormData] = useState({
        name,
        email,
        uid,
        socialLinks: {
            twitter: '',
            instagram: '',
            pinterest: '',
            portfolio: '',
        },
        avatar,
        bio: '',
        username,
        role: '',
        skill_level: '',
        location: '',
    });

    // Check if user already has a profile
    useEffect(() => {
        async function checkProfile() {
            try {
                const profile = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/user/${uid}`
                );
                if (profile.data.result !== null) {
                    // Fill the form with the data from the profile
                    const profileData = profile.data.result;
                    setFormData((prev) => ({
                        ...prev,
                        socialLinks: profileData.socialLinks,
                        bio: profileData.bio,
                        role: profileData.role,
                        skill_level: profileData.skill_level,
                        location: profileData.location,
                    }));
                }
            } catch (err) {
                console.log(err);
            }
        }

        checkProfile();
    }, []);

    const formSubmit = async (e) => {
        e.preventDefault();
        if (!formData.location || !formData.bio) {
            alert('Please fill all the required fields.');
            return;
        }

        dispatch(startLoading());
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        await axios
            .post(
                `${import.meta.env.VITE_SERVER_URL}/api/user/googleSignUp`,
                formData,
                config
            )
            .then((response) => {
                const user = response.data.result;
                dispatch(
                    signIn({
                        uid: user.uid,
                        bio: user.bio,
                        socialLinks: user.socialLinks,
                        location: user.location,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar,
                        username: user.email,
                        mid: user._id,
                        token: token,
                    })
                );
                window.localStorage.setItem('photoAppLastPage', '');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                alert('Something went wrong, please try again later.');
            });
        dispatch(stopLoading());
    };

    const handleLevelChange = (event) => {
        setFormData({ ...formData, skill_level: event.target.value });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            {/* Left SideBar with Profile Picture */}
            <Box
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '100%',
                    width: '30%',
                    backgroundColor: lMode1,
                    borderRight: '1px solid #000000',
                    p: 2,
                }}
            >
                <Stack
                    spacing={1}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: '100%',
                        width: '100%',
                        backgroundColor: lMode1,
                        p: 2,
                    }}
                >
                    <img
                        style={{
                            borderRadius: '50%',
                            height: '250px',
                            width: '250px',
                        }}
                        src={avatar}
                        alt='Profile Img'
                    />
                    <Typography
                        variant='h5'
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant='p'
                        sx={{
                            color: lMode6,
                        }}
                    >
                        {email}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            backgroundColor: lMode1,
                            padding: '10px',
                        }}
                    >
                        <Typography
                            variant='p'
                            sx={{
                                color: lMode6,
                            }}
                        >
                            Skill Level &nbsp;&nbsp;
                        </Typography>
                        <Select
                            labelId='demo-simple-select-helper-label'
                            id='demo-simple-select-helper'
                            value={
                                formData.skill_level.length !== 0
                                    ? formData.skill_level
                                    : 10
                            }
                            onChange={handleLevelChange}
                        >
                            <MenuItem value={10}>Beginner</MenuItem>
                            <MenuItem value={20}>Intermediate</MenuItem>
                            <MenuItem value={30}>Professional</MenuItem>
                        </Select>
                    </Box>

                    {/* Add input for location */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            backgroundColor: lMode1,
                            padding: '10px',
                        }}
                    >
                        <Typography
                            variant='p'
                            sx={{
                                color: lMode6,
                            }}
                        >
                            Location
                        </Typography>

                        <TextField
                            required
                            id='outlined-basic'
                            label='Location'
                            variant='outlined'
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                })
                            }
                            sx={{
                                color: lMode6,
                                backgroundColor: lMode1,
                                marginLeft: '10px',
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
            {/* Right part with Name, type of user and photo */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '100%',
                    width: '70%',
                    backgroundColor: lMode3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        p: 2,
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{
                            color: lMode1,
                            fontWeight: 'bold',
                        }}
                    >
                        I am a
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={
                                formData.role.length !== 0 ? formData.role : 10
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value,
                                })
                            }
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '25px',
                                color: lMode1,
                                backgroundColor: lMode6,
                                marginLeft: '10px',
                                border: 'none',
                                '&:focus': {
                                    border: 'none',
                                },
                                '&:hover': {
                                    border: 'none',
                                },
                            }}
                        >
                            <MenuItem value={10}>Explorer</MenuItem>
                            <MenuItem value={20}>Photographer</MenuItem>
                        </Select>
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            p: 2,
                        }}
                    >
                        {/* Bio */}
                        <TextField
                            required
                            id='outlined-multiline-static'
                            label='About Yourself'
                            multiline
                            rows={4}
                            sx={{
                                input: {
                                    color: 'black',
                                },
                            }}
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    bio: e.target.value,
                                })
                            }
                        />

                        {/* Social Media Links */}
                        {/* Create a 2 x 2 grid using MUI Grid */}

                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                p: 2,
                            }}
                        >
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <TwitterIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        id='input-with-sx'
                                        label='Twitter'
                                        variant='standard'
                                        value={formData.socialLinks.twitter}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                socialLinks: {
                                                    ...formData.socialLinks,
                                                    twitter: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <InstagramIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        id='input-with-sx'
                                        label='Instagram'
                                        variant='standard'
                                        value={formData.socialLinks.instagram}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                socialLinks: {
                                                    ...formData.socialLinks,
                                                    instagram: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <PinterestIcon
                                        sx={{
                                            color: 'action.active',
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        id='input-with-sx'
                                        label='Pinterest'
                                        variant='standard'
                                        value={formData.socialLinks.pinterest}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                socialLinks: {
                                                    ...formData.socialLinks,
                                                    pinterest: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <AccountCircle
                                        sx={{
                                            color: 'action.active',
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        id='input-with-sx'
                                        label='Portfolio'
                                        variant='standard'
                                        value={formData.socialLinks.portfolio}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                socialLinks: {
                                                    ...formData.socialLinks,
                                                    portfolio: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Save Button */}

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                width: '100%',
                                p: 2,
                            }}
                        >
                            <Button
                                // type='submit'
                                variant='contained'
                                sx={{
                                    backgroundColor: lMode1,
                                    color: lMode3,
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: lMode1,
                                        color: lMode3,
                                    },
                                }}
                                onClick={formSubmit}
                                fullWidth
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
