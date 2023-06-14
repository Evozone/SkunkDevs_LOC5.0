// React
import React, { useState } from 'react';

// React Router
import { useNavigate } from 'react-router';

// MUI components
import { Paper, Stack, Tooltip, IconButton } from '@mui/material';

// MUI Icons
import {
    Mic as MicIcon,
    MicOff as MicOffIcon,
    Headset as HeadsetIcon,
    HeadsetOff as HeadsetOffIcon,
    CallEnd as CallEndIcon,
} from '@mui/icons-material';

// 100ms Live Video React
import {
    useHMSActions,
    useHMSStore,
    selectIsLocalAudioEnabled,
} from '@100mslive/hms-video-react';

export default function Space_Remote({ peers }) {
    const navigate = useNavigate();
    const hmsActions = useHMSActions();
    const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);

    const setPeersVolume = (volume) => {
        for (const peer of peers) {
            if (peer.audioTrack) {
                hmsActions.setVolume(volume, peer.audioTrack);
            }
        }
    };

    const [deafen, setDeafen] = useState(false);

    const toggleDeafen = () => {
        setDeafen(!deafen);
        deafen ? setPeersVolume(100) : setPeersVolume(0);
    };

    const toggleMute = () => {
        hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
    };

    const leaveCall = () => {
        hmsActions.leave();
        navigate('/spaces');
    };

    const tooltips = [
        {
            title: isLocalAudioEnabled ? 'Mute' : 'Unmute',
            icon: isLocalAudioEnabled ? (
                <MicIcon />
            ) : (
                <MicOffIcon sx={{ color: 'error.main' }} />
            ),
            backgroundColor: !isLocalAudioEnabled && 'white',
            onClick: toggleMute,
        },
        {
            title: deafen ? 'Undeafen' : 'Deafen',
            icon: deafen ? (
                <HeadsetOffIcon sx={{ color: 'error.main' }} />
            ) : (
                <HeadsetIcon />
            ),
            backgroundColor: deafen && 'white',
            onClick: toggleDeafen,
        },
        {
            title: 'Leave Call',
            icon: <CallEndIcon sx={{ color: 'red' }} />,
            backgroundColor: 'white',
            onClick: leaveCall,
        },
    ];

    return (
        <Paper
            sx={{
                p: 1,
                border: '2px solid #fff',
                borderRadius: '30px',
                backgroundColor: 'transparent',
                width: 'fit-content',
            }}
        >
            <Stack direction='row' spacing={2}>
                {tooltips.map(({ title, icon, backgroundColor, onClick }) => (
                    <Tooltip title={title} arrow key={title}>
                        <IconButton
                            onClick={onClick}
                            sx={{
                                color: 'white',
                                backgroundColor,
                                '&:hover': {
                                    backgroundColor,
                                },
                            }}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Stack>
        </Paper>
    );
}
