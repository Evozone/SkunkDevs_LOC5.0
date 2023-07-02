// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { notify } from '../../../../features/notify/notifySlice';

// Material UI
import { Card, CardActions } from '@mui/material';

// External Libraries
import axios from 'axios';

// Custom Components
import { StyledButton } from '../../../helpers/StyledMUI';
import ListingTemplate from '../ListingTemplate';

export default function ListingCard({ listing, fetchListings }) {
    // Redux hooks
    const dispatch = useDispatch();

    const deleteListing = async () => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/api/listings/${listing._id}`
            );
            dispatch(
                notify({
                    open: true,
                    severity: 'success',
                    message: res.data.message,
                })
            );
            fetchListings();
        } catch (err) {
            console.log(err);
            dispatch(
                notify({
                    open: true,
                    severity: 'error',
                    message: err.response.data.message,
                })
            );
        }
    };

    return (
        <Card
            sx={{
                borderRadius: 3,
                border: '2px solid grey',
            }}
        >
            {/* Card content */}
            <ListingTemplate {...{ listing }} />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                {/* Button to delete the listing */}
                <StyledButton
                    variant='outlined'
                    color='error'
                    onClick={deleteListing}
                >
                    Delete
                </StyledButton>
            </CardActions>
        </Card>
    );
}
