// React
import React, { useState, useEffect } from 'react';

// MUI Components
import { Box, Stack, Typography } from '@mui/material';

// Components
import GlobalSearch from '../../navbar/search/GlobalSearch';
import TypewriterCycle from '../../helpers/TypewriterCycle';

export default function Hero() {
    // Whether or not to show the search bar
    const [showSearch, setShowSearch] = useState(true);

    // Hide the search bar when the user scrolls down
    useEffect(() => {
        function checkScroll() {
            if (window.scrollY > 0) {
                setShowSearch(false);
            } else {
                setShowSearch(true);
            }
        }

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <Stack spacing={2}>
                <Typography
                    variant='h1'
                    sx={{
                        mt: '3rem',
                        fontFamily: 'Geologica, sans-serif',
                        color: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    ShutterSpaces
                </Typography>
                <Typography
                    variant='h5'
                    sx={{
                        fontFamily: 'Geologica, sans-serif',
                        color: 'common.white',
                    }}
                >
                    Explore the{' '}
                    <TypewriterCycle
                        strings={[
                            'real',
                            'actual',
                            'non-AI',
                            'human',
                            'authentic',
                            'genuine',
                            'true',
                            'non-generated',
                        ]}
                    />{' '}
                    world.
                </Typography>
                {showSearch && <GlobalSearch lightModeColor='white' />}
            </Stack>
        </Box>
    );
}
