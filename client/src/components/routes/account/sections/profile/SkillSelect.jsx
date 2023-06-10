// React
import React from 'react';

// MUI Components
import { Stack, Typography, Select, MenuItem } from '@mui/material';

export default function SkillSelect({ formData, setFormData }) {
    return (
        <Select
            labelId='skill-level-label'
            id='skill-level'
            value={formData.skill_level || 'beginner'}
            size='small'
            onChange={(e) =>
                setFormData({
                    ...formData,
                    skill_level: e.target.value,
                })
            }
        >
            <MenuItem value='beginner'>Beginner</MenuItem>
            <MenuItem value='intermediate'>Intermediate</MenuItem>
            <MenuItem value='advanced'>Advanced</MenuItem>
        </Select>
    );
}
