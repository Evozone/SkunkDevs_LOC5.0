// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Typography } from '@mui/material';

// MUI Icons
import { ChatBubble } from '@mui/icons-material';

// External Libraries
import axios from 'axios';

// StyledButtons
import { StyledButton } from '../../../../helpers/StyledMUI';

export default function ChatWithBtn({ user }) {
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth);

    // Create chat function copied from Connect Section
    const createChat = async (chatId) => {
        const lastMessageTime = Date.now();
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chats`, {
                chatId,
                userOneInfo: user,
                userTwoInfo: currentUser,
                lastMessageTime,
            });
            redirectToChat();
        } catch (err) {
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. in a minute :('
                )
            );
            console.log(err);
        }
    };

    const addUserToChat = async () => {
        // Is user already in chat?
        const chatId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        const url = `${import.meta.env.VITE_SERVER_URL}/api/chats/${chatId}`;

        const response = await axios.get(url);

        if (response.data.result) {
            // Redirect to existing chat
            redirectToChat();
        } else {
            // Create new chat
            createChat(chatId);
        }
    };

    const redirectToChat = () => {
        navigate(`/connect`, { state: { user } });
    };

    return (
        <>
            {/* Redirect to Connect chat with this user button */}
            {currentUser?.uid === user?.uid ? null : (
                <StyledButton
                    variant='outlined'
                    color='primary'
                    sx={{ marginTop: '1rem' }}
                    onClick={addUserToChat}
                >
                    <ChatBubble /> &nbsp;
                    <Typography variant='body1' sx={{ textTransform: 'none' }}>
                        Chat with {user?.name}
                    </Typography>
                </StyledButton>
            )}
        </>
    );
}
