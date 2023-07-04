// React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import { Box } from '@mui/material';

// External Packages
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import { notify } from '../../../features/notify/notifySlice';

// Custom Components
import RouteContent from '../layout/RouteContent';
import ProfileContent from './profile_content/ProfileContent';
import ProfileHeader from './ProfileHeader';

export default function Profile() {
    const dispatch = useDispatch();
    const { username } = useParams();

    // user data
    const [user, setUser] = useState(null);

    // get user data
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/users/username/${username}`
                );
                setUser(res.data.result);
            } catch (err) {
                dispatch(
                    notify({
                        open: true,
                        message: err.response.data.message,
                        severity: 'error',
                    })
                );
            }
        };
        getUser();
    }, [username, dispatch]);

    return (
        <Box className='route-container'>
            <ProfileHeader {...{ user }} />
            <RouteContent>
                <ProfileContent {...{ user }} />
            </RouteContent>
        </Box>
    );
}
