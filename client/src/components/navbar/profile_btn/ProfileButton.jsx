// React
import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Avatar, IconButton } from '@mui/material';

// Custom Components
import ProfilePopover from './ProfilePopover';

export default function ProfileButton() {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const open = Boolean(menuAnchor);

    const currentUser = useSelector((state) => state.auth);

    const handleMenu = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchor(null);
    };

    return (
        <>
            <IconButton onClick={handleMenu} size='small'>
                <Avatar
                    alt={currentUser?.name}
                    src={currentUser?.avatar}
                    sx={{
                        border: '2px solid grey',
                        '&:hover': { border: '2px solid white' },
                    }}
                />
            </IconButton>
            <ProfilePopover {...{ open, menuAnchor, handleClose }} />
        </>
    );
}
