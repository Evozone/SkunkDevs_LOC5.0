// React
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// Material UI - Components
import { Box, Stack } from '@mui/material';

// 100ms Live Video React
import {
    useHMSStore,
    selectIsConnectedToRoom,
    selectPeers,
} from '@100mslive/hms-video-react';

import PeersContainer from './PeersContainer';
import SpaceRemote from './SpaceRemote';
import RoomInfo from './RoomInfo';

function StageRoom() {
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate('/spaces');
        }
    }, []);

    return (
        <Box
            sx={{
                pt: '5rem',
                px: 3,
                pb: 3,
            }}
            className='route-container'
        >
            <Stack direction='row' spacing={2} sx={{ height: '100%' }}>
                <Stack direction='column' spacing={0} alignItems='center'>
                    <RoomInfo />
                    <SpaceRemote {...{ peers }} />
                </Stack>
                <PeersContainer {...{ peers }} />
            </Stack>
        </Box>
    );
}

export default StageRoom;
