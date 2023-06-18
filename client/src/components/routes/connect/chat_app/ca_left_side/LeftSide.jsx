// React
import React, { useState } from 'react';

// Material UI
import { Box } from '@mui/material';

// Custom Components
import UserChats from './UserChats';
import SearchUser from './chat_search/SearchUser';
import ConnectSettings from './ConnectSettings';
import LSTabs from './LSTabs';

export default function LeftSide({
    value,
    setValue,
    otherUser,
    setOtherUser,
    socketRef,
    onlineUsers,
    connectSettings,
    setConnectSettings,
}) {
    const mode = window.localStorage.getItem('photoAppTheme');

    const [messageNotSeen, setMessageNotSeen] = useState([]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChatClick = (user) => {
        setOtherUser(user);
        if (user.new) {
            setValue(0);
        }
    };

    return (
        <Box
            sx={{
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Tabs */}
            <LSTabs {...{ value, handleTabChange }} />
            {/* Tab Panels */}
            <Box
                // Container for Tab Panels
                sx={{
                    m: 1,
                    mt: 0,
                    borderRadius: 3,
                    overflowY: 'auto',
                    flexGrow: 1,
                    backgroundColor: mode === 'light' ? 'grey.300' : 'grey.900',
                }}
            >
                {value === 0 && (
                    <UserChats
                        {...{
                            handleChatClick,
                            socketRef,
                            otherUser,
                            onlineUsers,
                            messageNotSeen,
                            setMessageNotSeen,
                            setValue,
                        }}
                    />
                )}
                {value === 1 && (
                    <SearchUser handleChatClick={handleChatClick} />
                )}
                {value === 2 && (
                    <ConnectSettings
                        setConnectSettings={setConnectSettings}
                        connectSettings={connectSettings}
                    />
                )}
            </Box>
        </Box>
    );
}
