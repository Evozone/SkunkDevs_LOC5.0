// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Avatar } from '@mui/material';

export default function ProfilePopover() {
    const currentUser = useSelector((state) => state.auth);

    return <Avatar alt={currentUser?.name} src={currentUser?.avatar} />;
}
