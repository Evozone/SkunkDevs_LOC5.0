// React
import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI - Components (named imports)
import { Box, Checkbox, Stack } from '@mui/material';

// Material UI - Icons (named imports)
import { List as ListIcon } from '@mui/icons-material';

// Other Components
import RouteHeader from '../layout/RouteHeader';
import RouteContent from '../layout/RouteContent';
import ExplorerListings from './explorer/ExplorerListings';
import PhotographerListings from './photographer/PhotographerListings';

export default function Listings() {
    const currentUser = useSelector((state) => state.auth);
    const [showExplorer, setShowExplorer] = useState(false);

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
                    // Photographers are also explorers
                    // Use checkbox to toggle between explorer and photographer listings
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <h3>Create/View my own listings instead</h3>
                            <Checkbox
                                checked={showExplorer}
                                onChange={() => setShowExplorer(!showExplorer)}
                                inputProps={{
                                    'aria-label': 'show explorer listings',
                                }}
                            />
                        </Stack>

                        {showExplorer ? (
                            <ExplorerListings />
                        ) : (
                            <PhotographerListings />
                        )}
                    </Stack>
                )}
            </RouteContent>
        </Box>
    );
}
