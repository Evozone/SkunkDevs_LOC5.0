// React
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// External Packages
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// Material UI - Components (named imports)
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Material UI - Icons (named imports)
import { Loop as LoopIcon } from '@mui/icons-material';

// Utils
import { formatDate } from '../../../../../../utils/formatTimestamp';

// Appwrite
import storage from '../../../../../../appwrite';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../../../../features/notify/notifySlice';
import {
    startLoading,
    stopLoading,
} from '../../../../../../features/loading/loadingSlice';

// Components
import TextBody from './TextBody';
import MessageInput from './msgInput/MessageInput';
import ChatTopBar from './ChatTopBar';

function ChatInterface({ otherUser, socketRef, connectSettings }) {
    const inputRef = useRef();
    const endRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth);
    const [messages, setMessages] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [loadButtonVisible, setLoadButtonVisible] = useState(true);
    const [prevOtherUser, setPrevOtherUser] = useState(null);
    const [timer, setTimer] = useState(null);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (otherUser.uid === prevOtherUser?.uid) return;
        setTimeout(() => {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 700);
        setPrevOtherUser(otherUser);
        setMessages(null);
        setLoadButtonVisible(true);
        loadConversation(0);
    }, [otherUser]);

    useEffect(() => {
        const socket = socketRef?.current;
        socketRef.current?.on('recieve_message', (message) => {
            if (message.senderId !== otherUser.uid) {
                return;
            }
            setMessages((prev) => {
                if (!prev || prev.length === 0) {
                    return [message];
                }
                return [...prev, message];
            });
            setTimeout(() => {
                endRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 700);
        });

        return () => {
            socket?.off('recieve_message');
        };
    }, [socketRef, otherUser, connectSettings]);

    useEffect(() => {
        const socket = socketRef?.current;
        socketRef.current?.on('typing_status', (data) => {
            if (
                data.senderId !== otherUser.uid ||
                !connectSettings.typingStatus
            ) {
                return;
            }
            setTyping(data.typing);
        });
        return () => {
            socket?.off('typing_status');
        };
    }, [socketRef, otherUser, connectSettings]);

    const loadConversation = async (page) => {
        const chatId =
            currentUser.uid > otherUser.uid
                ? `${currentUser.uid}${otherUser.uid}`
                : `${otherUser.uid}${currentUser.uid}`;
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/messages/${chatId}?page=${page}`
            );
            setPageNum(page);
            if (data.result.length === 0) {
                setLoadButtonVisible(false);
                if (!otherUser.new) {
                    dispatch(
                        notify(true, 'success', 'No more messages to load')
                    );
                }
                return;
            }
            setMessages((prev) => {
                if (!prev || prev.length === 0) {
                    return data.result.reverse();
                }
                return [...data.result.reverse(), ...prev];
            });
        } catch (error) {
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. in a minute :('
                )
            );
        }
    };

    const handleSendMessage = async (text) => {
        if (!text) {
            alert('Please enter a message');
            return;
        }
        const chatId =
            currentUser.uid > otherUser.uid
                ? currentUser.uid + otherUser.uid
                : otherUser.uid + currentUser.uid;
        const senderId = currentUser.uid;
        const senderName = currentUser.name;
        const senderEmail = currentUser.email;
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/messages`,
                {
                    chatId,
                    senderId,
                    senderName,
                    senderEmail,
                    text,
                    timestamp: Date.now(),
                }
            );
            socketRef.current.emit('send_message', {
                ...data.result,
                receiverId: otherUser.uid,
            });
            setMessages((prev) => {
                if (!prev || prev.length === 0) {
                    return [data.result];
                }
                return [...prev, data.result];
            });
            setTimeout(() => {
                endRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 700);
            inputRef.current.value = '';
        } catch (error) {
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. in a minute :('
                )
            );
            console.log(error);
        }
    };

    const uploadFile = async (file) => {
        dispatch(startLoading());
        const id = uuid();
        await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            id,
            file
        );
        const result = await storage.getFilePreview(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            id
        );
        await handleSendMessage(result.href);
        dispatch(stopLoading());
    };

    const textfieldOnChange = (event) => {
        if (event.target.value && connectSettings.typingStatus) {
            socketRef.current.emit('start_typing', {
                receiverId: otherUser.uid,
                senderId: currentUser.uid,
                typing: true,
            });
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
                socketRef.current.emit('stop_typing', {
                    receiverId: otherUser.uid,
                    senderId: currentUser.uid,
                    typing: false,
                });
            }, 1500);
            setTimer(newTimer);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, overflowY: 'hidden' }}>
            <ChatTopBar {...{ otherUser, typing, handleSendMessage }} />
            <Box
                sx={{
                    p: 1,
                    pb: 0,
                    height: 'calc(100vh - 190px)',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Load more button */}
                {messages?.length >= 10 && loadButtonVisible && (
                    <Button
                        onClick={() => loadConversation(pageNum + 1)}
                        endIcon={<LoopIcon />}
                        sx={{
                            alignSelf: 'center',
                            mb: '10px',
                            font: 'Poppins, sans-serif',
                            borderRadius: '20px',
                            height: '30px',
                        }}
                        variant='outlined'
                        disableElevation
                        color='success'
                    >
                        Load More Chats
                    </Button>
                )}

                {messages &&
                    messages.map((message, index) => {
                        const msgDate = formatDate(message.timestamp / 1000);
                        const nxtMsgDate = formatDate(
                            messages[index - 1]?.timestamp / 1000
                        );
                        if (index === 0 || msgDate !== nxtMsgDate) {
                            return (
                                <React.Fragment key={message._id}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: '11px',
                                                width: 'fit-content',
                                                padding: '2px 8px',
                                                background: '#898989',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            {msgDate}
                                        </div>
                                    </div>
                                    <TextBody {...{ message, endRef }} />
                                </React.Fragment>
                            );
                        }
                        return (
                            <TextBody
                                key={message._id}
                                {...{ message, endRef }}
                            />
                        );
                    })}
            </Box>
            <MessageInput
                handleSendMessage={handleSendMessage}
                inputRef={inputRef}
                uploadFile={uploadFile}
                textfieldOnChange={textfieldOnChange}
            />
        </Box>
    );
}

export default ChatInterface;
