// React
import React from 'react';

// MUI Components
import { TextField } from '@mui/material';

export default function Bio({ formData, setFormData }) {
    return (
        <TextField
            id='bio'
            label='Bio'
            placeholder='Tell us about yourself!'
            variant='outlined'
            value={formData.bio}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    bio: e.target.value,
                })
            }
            multiline
            rows={9}
            fullWidth
        />
    );
}
