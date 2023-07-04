// React
import React, { useState, useEffect } from 'react';

// MUI Components
import { Select, MenuItem } from '@mui/material';

export default function SkillSelect({ formData, setFormData }) {
    const [skillLevel, setSkillLevel] = useState('beginner');

    useEffect(() => {
        setFormData({
            ...formData,
            skill_level: skillLevel,
        });
    }, [skillLevel]);

    return (
        <Select
            labelId='skill-level-label'
            id='skill-level'
            value={skillLevel}
            size='small'
            onChange={(e) => {
                setSkillLevel(e.target.value);
            }}
        >
            <MenuItem value='beginner'>Beginner</MenuItem>
            <MenuItem value='intermediate'>Intermediate</MenuItem>
            <MenuItem value='advanced'>Advanced</MenuItem>
        </Select>
    );
}
