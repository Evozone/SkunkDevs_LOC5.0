import React, { useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import {
    signInAction,
    startLoadingAction,
    stopLoadingAction,
} from '../actions/actions';

import { lMode1, lMode2, lMode3, lMode4, lMode5, lMode6, light, deepDark, richBlack, dMode1, bluegrey, dMode2, dMode3, dMode4, dMode5, dMode6 } from '../utils/colors';

const GoogleOneTapLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleButton = useRef(null);

    const [displayType, setDisplayType] = useState('flex');
    const [gBtnDisplay, setGBtnDisplay] = useState('none');

    const handleResponse = async (response) => {
        dispatch(startLoadingAction());
        const token = response.credential;
        const { sub: uid, email, name, picture: photoURL } = jwtDecode(token);
        const username = email.split('@')[0];

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        await axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/api/user/googleSignUp`,
                {
                    uid,
                    email,
                    name,
                    photoURL,
                    username,
                    socialLinks: {
                        twitter: '',
                        instagram: '',
                        pinterest: '',
                    },
                },
                config
            )
            .then((result) => {
                const user = result.data.result;
                dispatch(
                    signInAction(
                        user.uid,
                        user.email,
                        user.name,
                        user.photoURL,
                        user.username,
                        user.socialLinks,
                        user.token
                    )
                );
                window.localStorage.setItem('photoAppLastPage', 'explore');
                navigate('/explore');
            })
            .catch((err) => {
                console.log(err);
                alert('Something went wrong, please try again later.');
            });
        dispatch(stopLoadingAction());
    };

    const handleGoogleLogIn = () => {
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
                    width: '20px',
                    height: '35px',
                    backgroundColor: lMode5,
                    color: lMode1,
                    borderRadius: '15px',
                    '&:hover': {
                        color: lMode6,
                        backgroundColor: lMode4,
                    },
                }}
                onClick={handleGoogleLogIn}
            >

            </Button>
            <div style={{ display: gBtnDisplay }} ref={googleButton}></div>
        </React.Fragment >
    );
};

export default GoogleOneTapLogin;
