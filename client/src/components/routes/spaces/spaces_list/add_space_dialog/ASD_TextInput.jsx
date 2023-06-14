// React
import React from 'react';

// Material-UI Components
import { TextField, Stack } from '@mui/material';

export default function ASD_TextInput({ form, setForm }) {
    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
            <TextField
                required
                id='title'
                name='title'
                label='Title'
                placeholder='Max 50 characters'
                value={form.title}
                onChange={(e) => {
                    setForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                    }));
                }}
            />
            <TextField
                required
                id='description'
                name='description'
                label='Description'
                placeholder='Max 255 characters'
                value={form.description}
                onChange={(e) => {
                    setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                    }));
                }}
                multiline
                rows={3}
            />
        </Stack>
    );
}
