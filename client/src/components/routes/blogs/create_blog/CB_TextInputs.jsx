// React
import React from 'react';

// MUI components
import { TextField, Stack } from '@mui/material';

export default function CB_TextInputs({ blogForm, setBlogForm }) {
    const handleTextChange = (e, key) => {
        setBlogForm((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const fields = [
        { label: 'Title', key: 'title', placeholder: 'Give your blog a title' },
        {
            label: 'Summary',
            key: 'summary',
            placeholder: 'Do not exceed 55 characters',
        },
    ];

    return (
        <Stack spacing={1} sx={{ width: '100%' }}>
            {fields.map((field) => (
                <TextField
                    fullWidth
                    required
                    id='outlined-required'
                    label={field.label}
                    variant='standard'
                    value={blogForm[field.key]}
                    onChange={(e) => handleTextChange(e, field.key)}
                    placeholder={field.placeholder}
                    key={field.key}
                    multiline={field.key === 'summary'}
                />
            ))}
        </Stack>
    );
}
