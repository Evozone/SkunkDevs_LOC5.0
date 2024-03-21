// React
import React from 'react';

// Material UI
import { Grid } from '@mui/material';

// Custom Components
import About_Location from './About_Location';
import Connections from './connection/Connections';
import UserBlogs from './creations/UserBlogs';
import UserPosts from './creations/UserPosts';

export default function ProfileContent({ user }) {
    return (
        <Grid container spacing={3}>
            <About_Location {...{ user }} />
            <Connections {...{ user }} />
            <UserPosts {...{ user }} />
            <UserBlogs {...{ user }} />
        </Grid>
    );
}
