// React
import React, { useState } from 'react';

// Material UI
import Box from '@mui/material/Box';

// MUI Icons
import PodcastsIcon from '@mui/icons-material/Podcasts';

// Components
import RouteHeader from '../layout/RouteHeader';
import RouteContent from '../layout/RouteContent';
import SpaceGrid from './spaces_list/SpaceGrid';
import AddSpace from './spaces_list/AddSpace';

export default function Spaces() {
    // list of spaces
    const [spaces, setSpaces] = useState(null);
    return (
        <Box className='route-container'>
            <RouteHeader
                title='Spaces'
                icon={<PodcastsIcon sx={{ fontSize: 60 }} />}
            />
            <RouteContent>
                <SpaceGrid {...{ spaces, setSpaces }} />
            </RouteContent>
            <AddSpace {...{ spaces, setSpaces }} />
        </Box>
    );
}
