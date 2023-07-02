// React
import React from 'react';

// Material UI
import { CardContent, Typography, Divider, Chip, Stack } from '@mui/material';

// MUI icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Custom Components
import { formatDateTime } from '../../../utils/formatTimestamp';
import PriceTag from './PriceTag';

export default function ListingTemplate({ listing }) {
    // Full country Names
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    const dateTime1 = formatDateTime(listing.fromDateTime);
    const dateTime2 = formatDateTime(listing.toDateTime);
    return (
        <CardContent>
            {/* Title and Budget */}
            <Stack
                direction='row'
                spacing={1}
                alignContent='center'
                justifyContent='space-between'
            >
                <Stack spacing={1}>
                    <Typography variant='h5'>{listing.title}</Typography>

                    <Typography variant='body2' color='text.secondary'>
                        by {listing.authorName}
                    </Typography>
                </Stack>
                {/* Budget of the listing */}
                <PriceTag price={listing.budget} />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
                variant='body2'
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                {/* Location of the listing */}
                <LocationOnIcon fontSize='small' />
                {listing.location.city},{' '}
                {regionNames.of(listing.location.country)}
            </Typography>

            {/* Time */}
            <Typography
                variant='body2'
                color='text.secondary'
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <span>{dateTime1}</span>
                <span>{dateTime2}</span>
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Description of the listing */}
            <Typography variant='body1'>{listing.description}</Typography>

            <Divider sx={{ my: 2 }} />

            {/* Tags of the listing */}
            <Stack direction='row' spacing={1}>
                {listing.tags.map((tag) => (
                    <Chip key={tag} label={tag} />
                ))}
            </Stack>
        </CardContent>
    );
}
