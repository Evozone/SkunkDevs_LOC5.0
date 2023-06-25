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
import PhotographerListings from './PhotographerListings';

export default function Listings() {
    const currentUser = useSelector((state) => state.auth);
    const [role, setRole] = React.useState('explorer');

    return (
        <Box className='route-container'>
            <RouteHeader
                {...{
                    title: 'Listings',
                    icon: <ListIcon sx={{ fontSize: 60 }} />,
                }}
            />
            <RouteContent>
                <Switch
                    sx={{ position: 'absolute', top: 70, right: 20 }}
                    checked={role === 'explorer'}
                    onChange={() =>
                        setRole(
                            role === 'explorer' ? 'photographer' : 'explorer'
                        )
                    }
                />
                {role === 'explorer' ? (
                    <ExplorerListings />
                ) : (
                    <PhotographerListings />
                )}
            </RouteContent>
        </Box>
    );
}
