// React
import React from 'react';

// Material UI
import { FormControl, Typography, Grid, Divider } from '@mui/material';

// Components
import AL_Tags from '../../explorer/add_job/AL_Tags';
import AL_Time from '../../explorer/add_job/AL_Time';
import AL_Location from '../../explorer/add_job/AL_Location';
import BudgetRange from './BudgetRange';

// Styled Components
import { StyledButton } from '../../../../helpers/StyledMUI';

export default function ListingFilters({ filters, setFilters, fetchListings }) {
    // Handles when a filter input changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Handles when the filter form is submitted
    const handleFilterSubmit = (event) => {
        event.preventDefault();
        fetchListings();
    };

    return (
        <FormControl
            component='form'
            onSubmit={handleFilterSubmit}
            sx={{
                p: 2,
                mb: 2,
                width: '100%',
                border: '1px dashed',
                borderColor: 'primary.dark',
                borderRadius: 3,
            }}
        >
            <Typography variant='h5' sx={{ mb: 2 }}>
                Filters
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <AL_Location
                        listingData={filters}
                        setListingData={setFilters}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <BudgetRange {...{ filters, handleFilterChange }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <AL_Tags
                        listingData={filters}
                        handleChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <AL_Time
                        listingData={filters}
                        handleChange={handleFilterChange}
                    />
                </Grid>
            </Grid>

            {/* Apply filters button */}
            <StyledButton
                type='submit'
                variant='outlined'
                sx={{ mt: 2 }}
                disabled
            >
                Filtering Features Coming Soon!
            </StyledButton>
        </FormControl>
    );
}
