// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { Grid, IconButton, Tooltip, Stack } from '@mui/material';

// MUI Icons
import {
    Twitter,
    Pinterest,
    AccountCircle,
    Instagram,
} from '@mui/icons-material';
import ChatWithBtn from './ChatWithBtn';

export default function Connections({ user }) {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    const socials = [
        {
            name: 'Personal Website',
            icon: <AccountCircle fontSize='large' />,
            link: user?.socialLinks?.portfolio,
        },
        {
            name: 'Twitter',
            icon: <Twitter fontSize='large' />,
            link: user?.socialLinks?.twitter,
        },
        {
            name: 'Pinterest',
            icon: <Pinterest fontSize='large' />,
            link: user?.socialLinks?.pinterest,
        },
        {
            name: 'Instagram',
            icon: <Instagram fontSize='large' />,
            link: user?.socialLinks?.instagram,
        },
    ];

    return (
        <Grid
            item
            xs={12}
            md={5}
            sx={{
                // Dotted rounded box
                border: '3px dotted #ccc',
                borderRadius: 3,
                padding: '1rem',
                margin: '1rem 0',
            }}
        >
            {/* Heading */}
            <h2 style={{ marginTop: 0 }}>Connect with {user?.name}</h2>

            {/* Social links */}
            <Stack spacing={1} direction='row'>
                {socials.map((social, index) =>
                    /* If no link provided, don't render the button */
                    !social.link ? null : (
                        <Tooltip
                            key={index}
                            title={
                                social.link ? social.name : 'No link provided'
                            }
                        >
                            <IconButton
                                href={social.link || '#'}
                                target='_blank'
                                rel='noopener noreferrer'
                                color='primary'
                            >
                                {social.icon}
                            </IconButton>
                        </Tooltip>
                    )
                )}
            </Stack>

            {/* Redirect to Connect chat with this user button */}
            {isSignedIn ? <ChatWithBtn {...{ user }} /> : null}
        </Grid>
    );
}
