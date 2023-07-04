// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { Menu, MenuItem, ListItemIcon } from '@mui/material';

// Icons
import {
    AccountCircle,
    Logout,
    Settings,
    FaceRetouchingNatural,
} from '@mui/icons-material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../features/auth/authSlice';

export default function ProfilePopover({ open, menuAnchor, handleClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUserName = useSelector((state) => state.auth.username);

    const menuItems = [
        {
            label: 'Your Profile',
            icon: <FaceRetouchingNatural />,
            onClick: () => {
                navigate(`/profile/${currentUserName}`);
            },
        },
        {
            label: 'Account',
            icon: <AccountCircle />,
            onClick: () => {
                navigate('/account', { state: { tab: 'Profile' } });
            },
        },
        {
            label: 'Settings',
            icon: <Settings />,
            onClick: () => {
                navigate('/account', { state: { tab: 'Settings' } });
            },
        },
        {
            label: 'Logout',
            icon: <Logout />,
            onClick: () => {
                dispatch(signOut());
                window.localStorage.removeItem('photoAppLastPage');
                navigate('/');
            },
        },
    ];

    return (
        <Menu
            anchorEl={menuAnchor}
            id='profile-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    // The small arrow pointing to button
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {menuItems.map(({ label, icon, onClick }) => (
                <MenuItem key={label} onClick={onClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    {label}
                </MenuItem>
            ))}
        </Menu>
    );
}
