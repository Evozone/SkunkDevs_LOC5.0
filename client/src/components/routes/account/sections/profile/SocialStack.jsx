// React
import React from 'react';

// MUI Components
import { TextField, Stack, InputAdornment } from '@mui/material';

// Material UI Icons
import {
    AccountCircle,
    Twitter,
    Instagram,
    Pinterest,
} from '@mui/icons-material';

// Arrays
const socials = [
    { name: 'portfolio', icon: <AccountCircle /> },
    { name: 'twitter', icon: <Twitter /> },
    { name: 'instagram', icon: <Instagram /> },
    { name: 'pinterest', icon: <Pinterest /> },
];

// Components
import Location from './Location';

export default function SocialStack({ formData, setFormData }) {
    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {/* Social Links */}
            {socials.map((link) => (
                <TextField
                    key={link.name}
                    value={formData.socialLinks[link.name]}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            socialLinks: {
                                ...formData.socialLinks,
                                [link.name]: e.target.value,
                            },
                        })
                    }
                    id={link.name}
                    placeholder={
                        link.name.charAt(0).toUpperCase() + link.name.slice(1)
                    }
                    variant='standard'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                {link.icon}
                            </InputAdornment>
                        ),
                    }}
                />
            ))}

            <Location {...{ formData, setFormData }} />
        </Stack>
    );
}
