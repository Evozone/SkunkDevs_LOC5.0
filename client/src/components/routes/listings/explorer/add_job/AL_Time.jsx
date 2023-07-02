// React
import React from 'react';

// Material UI
import { Stack } from '@mui/material';

// Custom Components
import { dateTimeinputStyle } from '../../../../helpers/StyledMUI';

export default function AL_Time({ listingData, handleChange }) {
    // To set  fromDateTime and toDateTime, update the listingData state
    return (
        <Stack spacing={2}>
            <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='space-between'
            >
                <label>From:</label>
                <input
                    style={dateTimeinputStyle}
                    type='datetime-local'
                    name='fromDateTime'
                    value={listingData.fromDateTime}
                    onChange={handleChange}
                />
            </Stack>
            <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='space-between'
            >
                <label>To:</label>
                <input
                    style={dateTimeinputStyle}
                    type='datetime-local'
                    name='toDateTime'
                    value={listingData.toDateTime}
                    onChange={handleChange}
                />
            </Stack>
        </Stack>
    );
}
