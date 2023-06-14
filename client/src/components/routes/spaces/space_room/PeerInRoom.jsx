// React
import React from 'react';

// Material UI - Components
import { Box, Typography, Avatar, Stack } from '@mui/material';

// Material UI - Icons
import { MicOff as MicOffIcon } from '@mui/icons-material';

// 100ms Live Video React
import {
    useHMSStore,
    selectIsPeerAudioEnabled,
} from '@100mslive/hms-video-react';
import ModeratorMenu from './ModeratorMenu';

function PeerInRoom({ peer }) {
    // Variable to check if audio is enabled for the peer
    const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));

    return (
        <Box
            key={peer.id}
            sx={{
                display: 'grid',
                placeItems: 'center',
                backgroundColor: 'background.paper',
                opacity: 0.8,
                borderRadius: 5,
                position: 'relative',
            }}
        >
            {/* Moderator Menu */}
            <ModeratorMenu {...{ peer, audioEnabled }} />

            {/* Whether person is muted or not */}
            {!audioEnabled && (
                <MicOffIcon
                    sx={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '10px',
                    }}
                />
            )}

            <Stack spacing={2} justifyContent='center' alignItems='center'>
                <Avatar
                    alt={peer.name.charAt(0).toUpperCase()}
                    src={peer.name.split('@')[1]}
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: peer.name.split('@')[1]
                            ? 'transparent'
                            : 'primary.main',
                        fontSize: '2.5rem',
                    }}
                >
                    {peer.name.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                    sx={{
                        font: '400 1.5rem Geologica, sans-serif',
                    }}
                >
                    {peer.name.split('@')[0]}
                </Typography>
            </Stack>

            <Typography
                sx={{
                    fontSize: '1rem',
                    opacity: 0.7,
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                }}
            >
                {peer.roleName.charAt(0).toUpperCase() + peer.roleName.slice(1)}
            </Typography>
        </Box>
    );
}

export default PeerInRoom;
