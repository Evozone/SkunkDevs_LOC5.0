// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI - Components (named imports)
import { Box, Switch } from '@mui/material';

// Material UI - Icons (named imports)
import { List as ListIcon } from '@mui/icons-material';

// Other Components
import RouteHeader from '../layout/RouteHeader';
import RouteContent from '../layout/RouteContent';
import ExplorerListings from './explorer/ExplorerListings';
import PhotographerListings from './photographer/PhotographerListings';

export default function Listings() {
    const currentUser = useSelector((state) => state.auth);

    return (
        <Box className='route-container'>
            <RouteHeader
                {...{
                    title: 'Listings',
                    icon: <ListIcon sx={{ fontSize: 60 }} />,
                }}
            />
            <RouteContent>
                {currentUser.role === 'explorer' ? (
                    <ExplorerListings />
                ) : (
                    <PhotographerListings />
                )}
            </RouteContent>
        </Box>
    );
}
