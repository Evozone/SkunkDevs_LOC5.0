// React
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';

// External Packages
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/authSlice';
import { startLoading, stopLoading } from '../../features/loading/loadingSlice';

const GoogleOneTapLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleButton = useRef(null);

    const [displayType, setDisplayType] = useState('flex');
    const [gBtnDisplay, setGBtnDisplay] = useState('none');

    const handleResponse = async (response) => {
        // Get token from Google
        const token = response.credential;
        dispatch(startLoading());

        const decodedToken = jwtDecode(token);

        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/${
                    decodedToken.sub
                }`
            );
            const user = data.result;
            if (user === null) {
                console.log('User does not exist');
                navigate('/profile', { state: { token } });
            } else {
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

                navigate('/' + window.localStorage.getItem('photoAppLastPage'));
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLogIn = () => {
        try {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                ux_mode: 'popup',
                callback: handleResponse,
            });
            window.google.accounts.id.renderButton(googleButton.current, {
                theme: 'filled_blue',
                size: 'large',
                width: 280,
                text: 'continue_with',
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                    alert('Please allow Third Party Cookies');
                }
                if (
                    notification.isSkippedMoment() ||
                    notification.isDismissedMoment()
                ) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                }
            });
        } catch (error) {
            console.log(error);
            alert('Log In Failed. Please try again');
        }
    };

    return (
        <React.Fragment>
            <Button
                variant='contained'
                startIcon={<Google />}
                sx={{
                    display: displayType,
                    height: '35px',
                    borderRadius: '15px',
                }}
                onClick={handleGoogleLogIn}
            >
                Continue with Google
            </Button>
            <div style={{ display: gBtnDisplay }} ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;
