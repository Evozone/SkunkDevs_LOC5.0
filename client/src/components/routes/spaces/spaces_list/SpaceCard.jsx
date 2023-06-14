// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    startLoading,
    stopLoading,
} from '../../../../features/loading/loadingSlice';
import { notify } from '../../../../features/notify/notifySlice';

// Material UI
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
} from '@mui/material';

// Material UI Icons
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import DeleteIcon from '@mui/icons-material/Delete';

// External Packages
import axios from 'axios';
import { useHMSActions } from '@100mslive/hms-video-react';
import { StyledButton } from '../../../helpers/StyledMUI';

export default function SpaceCard({ space }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Current user to check if he is the creator of the space
    const currentUser = useSelector((state) => state.auth);
    // Mode
    const mode = localStorage.getItem('photoAppTheme');
    // Room actions
    const hmsActions = useHMSActions();

    // Function that generates a token for the user to join the space
    const getToken = async (roomId, createdById) => {
        var role = '';
        createdById.includes(currentUser.uid)
            ? (role = 'moderator')
            : (role = 'participant');
        const response = await fetch(
            `${import.meta.env.VITE_100MS_TOKEN_ENDPOINT}api/token`,
            {
                method: 'POST',
                body: JSON.stringify({
                    user_id: currentUser.uid,
                    role,
                    room_id: roomId,
                }),
            }
        );
        const { token } = await response.json();
        return token;
    };

    // Function that joins the user to the space
    const joinSpace = (roomId, createdById) => {
        dispatch(startLoading());
        getToken(roomId, createdById)
            .then(async (token) => {
                await hmsActions.join({
                    userName: `${currentUser.username}@${currentUser.avatar}`,
                    authToken: token,
                    settings: {
                        isAudioMuted: true,
                    },
                    initEndpoint: import.meta.env.VITE_100MS_TOKEN_ENDPOINT,
                });
                dispatch(stopLoading());
                navigate(`/room/${roomId}`, { state: { space } });
                dispatch(
                    notify({
                        open: true,
                        severity: 'success',
                        message: 'Joined the Space successfully!',
                    })
                );
            })
            .catch((error) => {
                dispatch(stopLoading());
                dispatch(
                    notify({
                        open: true,
                        severity: 'error',
                        message: 'Error joining the Space!',
                    })
                );
                console.log('Token API Error', error);
            });
    };

    // Function that deletes the space, only if the user is the creator of the space
    const deleteSpace = async (roomId) => {
        const choice = window.confirm(
            'Are you sure you want to delete this Space?'
        );
        if (!choice) return;
        const dnd = window.localStorage.getItem('photoApp');
        try {
            await axios({
                method: 'DELETE',
                url: `${import.meta.env.VITE_SERVER_URL}/api/rooms/${roomId}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
            });
            window.location.reload();
            dispatch(notify(true, 'success', 'Deleted a Space successfully!'));
        } catch (error) {
            console.log(error);
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. later :('
                )
            );
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4} key={space.roomId}>
            <Card
                key={space.roomId}
                elevation={4}
                sx={{
                    borderRadius: 5,
                    backgroundColor: mode === 'light' ? 'grey.200' : 'default',
                }}
            >
                {/* Image */}
                <CardMedia image={space.cover} sx={{ height: 200 }} />
                {/* Info thing */}
                <CardContent>
                    {/* Title of Room */}
                    <Typography
                        sx={{ font: '400 1.5rem Geologica, sans-serif' }}
                    >
                        {space.title}
                    </Typography>
                    {/* Created by and Created at */}
                    <Typography variant='subtitle2' color='text.secondary'>
                        by{' '}
                        {`${space.createdByUsername} on ${
                            space.createdAt.split('T')[0]
                        }`}
                    </Typography>
                    {/* Description */}
                    <Box
                        sx={{
                            height: '4rem',
                            overflow: 'hidden',
                        }}
                    >
                        <Typography
                            variant='body1'
                            sx={{
                                font: '400 1rem/1.5rem Work Sans, sans-serif',
                            }}
                        >
                            {space.description.length > 55
                                ? space.description.slice(0, 55) + '...'
                                : space.description}
                        </Typography>
                    </Box>
                    {/* Join and Delete Buttons */}
                    <StyledButton
                        color='success'
                        variant='outlined'
                        disabled={!currentUser.isSignedIn}
                        onClick={() => {
                            joinSpace(space.roomId, space.createdById);
                        }}
                        endIcon={<PhoneInTalkIcon />}
                    >
                        {currentUser.isSignedIn ? 'Join' : 'Sign In to Join'}
                    </StyledButton>
                    {space.createdById === currentUser.uid && (
                        <StyledButton
                            sx={{ ml: 2 }}
                            variant='outlined'
                            color='error'
                            endIcon={<DeleteIcon />}
                            onClick={() => {
                                deleteSpace(space._id);
                            }}
                        >
                            Delete
                        </StyledButton>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
