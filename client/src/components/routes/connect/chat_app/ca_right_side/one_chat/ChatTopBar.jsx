// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Redux Toolkit
import { useDispatch } from 'react-redux';
import {
    startLoading,
    stopLoading,
} from '../../../../../../features/loading/loadingSlice';

// MUI components
import { AppBar, IconButton } from '@mui/material';

// MUI icons
import { VideoCall } from '@mui/icons-material';

// External libraries
import { v4 as uuid } from 'uuid';

// Other components
import OtherUserBrand from './OtherUserBrand';

export default function ChatTopBar({ otherUser, typing, handleSendMessage }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Start a personal call with the other user
    const startPersonalCall = async () => {
        // dispatch(startLoading());
        // const id = uuid();
        // const CALL_TEMPLATE = `Hey, Lets talk more on a video call. Please click on the link below to join the call. \n\n ${
        //     import.meta.env.VITE_BASE_URL
        // }/connect/call/${id}`;
        // await handleSendMessage(CALL_TEMPLATE);
        // dispatch(stopLoading());
        // navigate(`/connect/call/${id}`);

        alert('This feature is not available yet.');
    };

    return (
        <AppBar
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'grey.600',
                alignItems: 'center',
                px: 2,
                borderRadius: 3,
            }}
            elevation={0}
            position='static'
        >
            <OtherUserBrand {...{ otherUser, typing }} />
            <IconButton onClick={startPersonalCall}>
                <VideoCall sx={{ height: 40, width: 40 }} />
            </IconButton>
        </AppBar>
    );
}
