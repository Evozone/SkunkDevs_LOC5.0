// React
import React from 'react';

// Material UI
import { Grid, Stack, Typography } from '@mui/material';

// MUI Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function About_Location({ user }) {
    // Full names of countries
    const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return (
        <Grid item xs={12} md={7}>
            <Stack spacing={2}>
                <Typography variant='h4'>About</Typography>
                <Typography variant='body1'>
                    {user?.bio || 'No bio yet'}
                </Typography>
                <Typography
                    variant='h6'
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <LocationOnIcon sx={{ mr: '0.5rem' }} />
                    {user?.location && (
                        <>
                            {user?.location.city +
                                ', ' +
                                countryNames.of(user?.location.country || '')}
                        </>
                    )}
                </Typography>
            </Stack>
        </Grid>
    );
}
