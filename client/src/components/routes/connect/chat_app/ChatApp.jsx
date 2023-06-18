// React
import { useEffect, useRef, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Box } from '@mui/material';

// Socket
import { initSocket } from '../../../../socket';

// Custom Components
import RightSide from './ca_right_side/RightSide';
import LeftSide from './ca_left_side/LeftSide';

export default function ChatApp() {
    const socketRef = useRef(null);

    const [value, setValue] = useState(0);
    const [otherUser, setOtherUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [connectSettings, setConnectSettings] = useState();

    const currentUser = useSelector((state) => state.auth);

    useEffect(() => {
        if (!(Notification.permission === 'granted')) {
            const data = {
                showNotifications: false,
                textContent: false,
                playSound: true,
                onlineStatus: true,
                typingStatus: true,
            };
            window.localStorage.setItem(
                'photoAppConnectSettings',
                JSON.stringify(data)
            );
            setConnectSettings(data);
        } else {
            const data = {
                showNotifications: true,
                textContent: false,
                playSound: true,
                onlineStatus: true,
                typingStatus: true,
            };
            window.localStorage.setItem(
                'photoAppConnectSettings',
                JSON.stringify(data)
            );
            setConnectSettings(data);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket('chat');
            socketRef.current.on('connect_error', (error) =>
                handleErrors(error)
            );
            socketRef.current.on('connect_failed', (error) =>
                handleErrors(error)
            );
            function handleErrors(error) {
                console.log('socket error', error);
                alert(
                    'Socket connection failed, Please close the tab & try again later.'
                );
            }
            socketRef.current.emit('join', {
                newUserId: currentUser.uid,
                onlineStatus: connectSettings?.onlineStatus,
            });
            socketRef.current.on('online_users', (users) => {
                if (connectSettings?.onlineStatus) {
                    setOnlineUsers(
                        users.filter((user) => user.onlineStatus === true)
                    );
                } else {
                    setOnlineUsers([]);
                }
            });
        };
        init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current?.off('connect_error');
            socketRef.current?.off('connect_failed');
            socketRef.current?.off('online_users');
            socketRef.current?.off('recieve_message');
            socketRef.current?.off('typing_status');
        };
    }, [currentUser, connectSettings]);

    useEffect(() => {
        socketRef.current?.on('recieve_notification', (message) => {
            if (
                (otherUser === null || message.senderId !== otherUser.uid) &&
                connectSettings?.showNotifications
            ) {
                const audio = new Audio('/assets/audio/notification.mp3');
                const body = connectSettings?.textContent
                    ? 'New message from ' +
                      message.senderName +
                      ' - ' +
                      message.text
                    : 'New message from ' + message.senderName;
                const notification = new Notification('Dev Chat+', {
                    body,
                    // icon: '/logo192.png',
                    tag: message.senderId,
                });
                connectSettings?.playSound && audio.play();
                notification.onclick = () => {
                    window.focus();
                    setValue(0);
                };
            }
        });
        return () => {
            socketRef.current?.off('recieve_notification');
        };
    });

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 65px)',
                display: 'flex',
                backgroundColor: 'background.paper',
            }}
        >
            <LeftSide
                {...{
                    value,
                    setValue,
                    otherUser,
                    setOtherUser,
                    socketRef,
                    onlineUsers,
                    connectSettings,
                    setConnectSettings,
                }}
            />
            <RightSide {...{ otherUser, socketRef, currentUser }} />
        </Box>
    );
}
