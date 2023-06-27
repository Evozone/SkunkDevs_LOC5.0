// React
import React from 'react';

// Material UI
import {
    Chip,
    MenuItem,
    Typography,
    Select,
    Stack,
    OutlinedInput,
    InputLabel,
    Box,
    FormControl,
} from '@mui/material';

export default function AL_Tags({ listingData, setListingData }) {
    const tags = [
        'Wedding',
        'Nature',
        'Portrait',
        'Fashion',
        'Sports',
        'Events',
        'Architecture',
        'Food',
        'Product',
        'Astrophotography',
        'Street',
        'Night',
        'Long Exposure',
        'Black and White',
        'Macro',
        'Family',
        'Travel',
        'Fine Art',
        'Aerial',
        'Cityscape',
        'Wildlife',
        'Underwater',
        'Abstract',
        'Urban Exploration',
        'Drone',
        'Pet',
        'Landscape',
        'Interior',
        'Real Estate',
        'Stock',
        'Boudoir',
        'Newborn',
        'Maternity',
    ];

    // When tags are selected, update the listingData state
    const handleTagsChange = (event) => {
        setListingData({
            ...listingData,
            tags: event.target.value,
        });
    };

    return (
        <Stack spacing={2}>
            <Typography id='tags-title'>Tags</Typography>
            <FormControl>
                <InputLabel id='tags-label'>Tags</InputLabel>
                <Select
                    labelId='tags-label'
                    id='tags'
                    multiple
                    value={listingData.tags}
                    onChange={handleTagsChange}
                    inputProps={{ 'aria-label': 'Select Tags' }}
                    input={<OutlinedInput label='Tags' />}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((tag) => (
                                <Chip key={tag} label={tag} />
                            ))}
                        </Box>
                    )}
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
}
