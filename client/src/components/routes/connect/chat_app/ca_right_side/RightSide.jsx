// React
import React from 'react';

// Material UI
import { Box } from '@mui/material';

// Custom Components
import ChatInterface from './one_chat/ChatInterface';
import RightSideDefault from './RightSideDefault';

export default function RightSide({ otherUser, socketRef, connectSettings }) {
    const mode = window.localStorage.getItem('photoAppTheme');

    return (
        <Box
            sx={{
                m: 1,
                ml: 0,
                borderRadius: 3,
                flexGrow: 1,
                backgroundColor: mode === 'light' ? 'grey.300' : 'grey.900',
                position: 'relative',
            }}
        >
            {!otherUser ? (
                <RightSideDefault />
            ) : (
                <ChatInterface {...{ otherUser, socketRef, connectSettings }} />
            )}
        </Box>
    );
}
