// React
import React from 'react';

// Material UI
import {
    ListItem,
    Avatar,
    Typography,
    Tooltip,
    IconButton,
} from '@mui/material';

// Material UI Icons
import AddCommentIcon from '@mui/icons-material/AddComment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function SearchedUser({
    user,
    createChat,
    handleShowProfileInfo,
}) {
    return (
        <ListItem
            sx={{
                m: 1,
                p: 0,
                width: 'calc(100% - 16px)',
                borderRadius: '100px',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
            }}
        >
            <Avatar
                src={user?.avatar}
                alt='user avatar'
                sx={{
                    width: 50,
                    height: 50,
                }}
            >
                {user.name[0].toUpperCase()}
            </Avatar>
            <Typography
                sx={{
                    font: '400 1rem Geologica, sans-serif',
                    ml: 1,
                }}
            >
                {user.name}
            </Typography>
            <Tooltip title={`View ${user.name}'s Profile`} placement='bottom'>
                <IconButton
                    sx={{ ml: 'auto' }}
                    onClick={() => handleShowProfileInfo(user)}
                >
                    <RemoveRedEyeIcon color='primary' />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={`Start a conversation with ${user.name}`}
                placement='right'
            >
                <IconButton sx={{ mr: 1 }} onClick={() => createChat(user)}>
                    <AddCommentIcon color='primary' />
                </IconButton>
            </Tooltip>
        </ListItem>
    );
}
