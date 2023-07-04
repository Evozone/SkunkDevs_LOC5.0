// React
import React from 'react';

// Material UI
import { Card, CardActions } from '@mui/material';
// Custom Components
import ListingTemplate from '../ListingTemplate';
import { StyledButton } from '../../../helpers/StyledMUI';

export default function PhListCard({ listing }) {
    return (
        <Card
            key={listing._id}
            sx={{
                borderRadius: 3,
                border: '2px solid grey',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <ListingTemplate {...{ listing }} />
            {/* Button to go to Author's profile */}
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <StyledButton
                    variant='outlined'
                    color='primary'
                    href={`/profile/${listing.authorUsername}`}
                    sx={{ textTransform: 'none' }}
                >
                    Visit @{listing.authorUsername}
                </StyledButton>
            </CardActions>
        </Card>
    );
}
