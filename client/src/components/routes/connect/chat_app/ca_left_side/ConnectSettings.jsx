import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

import {
    lMode1,
    lMode2,
    lMode3,
    lMode4,
    lMode5,
    lMode6,
    dMode1,
    dMode2,
    dMode3,
    dMode4,
    dMode5,
    dMode6,
} from '../../../../../utils/colors';

function ConnectSettings({ setConnectSettings, connectSettings }) {
    const [checkState, setCheckState] = useState({
        showNotifications: connectSettings.showNotifications,
        textContent: connectSettings.textContent,
        playSound: connectSettings.playSound,
        onlineStatus: connectSettings.onlineStatus,
        typingStatus: connectSettings.typingStatus,
    });

    const notificationPrompt = () => {
        Notification.requestPermission().then((result) => {
            if (result === 'granted') {
                const notification = new Notification('Dev Chat+', {
                    body: 'You will be notified like this when you receive a new message',
                    // icon: '/assets/icons/maskable_icon_x48.png',
                    tag: 'example notification',
                });
                const audio = new Audio('/assets/audio/notification.mp3');
                checkState.playSound && audio.play();
                notification.onclick = () => {
                    window.focus();
                    audio.pause();
                };

                setCheckState({
                    ...checkState,
                    showNotifications: true,
                });
                setConnectSettings({
                    ...checkState,
                    showNotifications: true,
                });
                window.localStorage.setItem(
                    'photoAppConnectSettings',
                    JSON.stringify({
                        ...checkState,
                        showNotifications: true,
                    })
                );
            } else {
                setCheckState({
                    ...checkState,
                    showNotifications: false,
                });
                setConnectSettings({
                    ...checkState,
                    showNotifications: false,
                });
                window.localStorage.setItem(
                    'photoAppConnectSettings',
                    JSON.stringify({
                        ...checkState,
                        showNotifications: false,
                    })
                );
            }
        });
    };

    const handleCheckboxChange = (event) => {
        if (
            event.target.name === 'showNotifications' &&
            !checkState.showNotifications
        ) {
            notificationPrompt();
            return;
        }
        setCheckState({
            ...checkState,
            [event.target.name]: event.target.checked,
        });
        setConnectSettings({
            ...checkState,
            [event.target.name]: event.target.checked,
        });
        window.localStorage.setItem(
            'photoAppConnectSettings',
            JSON.stringify({
                ...checkState,
                [event.target.name]: event.target.checked,
            })
        );
    };

    return (
        <Box sx={{ p: 3, pl: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Checkbox
                            checked={checkState.showNotifications}
                            onChange={handleCheckboxChange}
                            color='primary'
                            name='showNotifications'
                        />
                    }
                    label='Show notifications'
                />
                {checkState.showNotifications && (
                    <>
                        <FormControlLabel
                            sx={{ mb: 2 }}
                            control={
                                <Checkbox
                                    checked={checkState.textContent}
                                    onChange={handleCheckboxChange}
                                    color='primary'
                                    name='textContent'
                                />
                            }
                            label='Show text content in notifications'
                        />
                        <FormControlLabel
                            sx={{ mb: 2 }}
                            control={
                                <Checkbox
                                    checked={checkState.playSound}
                                    onChange={handleCheckboxChange}
                                    color='primary'
                                    name='playSound'
                                />
                            }
                            label='Play sound on notifications'
                        />
                    </>
                )}
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Checkbox
                            checked={checkState.typingStatus}
                            onChange={handleCheckboxChange}
                            color='primary'
                            name='typingStatus'
                        />
                    }
                    label='Show typing status'
                />
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Checkbox
                            checked={checkState.onlineStatus}
                            onChange={handleCheckboxChange}
                            color='primary'
                            name='onlineStatus'
                        />
                    }
                    label='Show online status'
                />
                <FormHelperText>
                    *Online status change will take effect once you refresh the
                    page or log out and log in again.
                </FormHelperText>
            </Box>
        </Box>
    );
}

export default ConnectSettings;
