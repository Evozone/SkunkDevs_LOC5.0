// React
import React from 'react';

// MUI Components
import { Stack, Typography } from '@mui/material';

// Styled Components
import { StyledSwitch } from '../../../../helpers/StyledMUI';

// Custom Components
import SkillSelect from './SkillSelect';

export default function RoleSwitch({ formData, setFormData }) {
    const { role } = formData;
    return (
        <Stack spacing={2} direction='row' alignItems='center'>
            <Typography sx={{ font: '400 1rem Geologica, sans-serif' }}>
                I am a photographer
            </Typography>
            <StyledSwitch
                checked={role === 'photographer'}
                value={role}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        role: e.target.checked ? 'photographer' : 'explorer',
                    })
                }
                name='role'
                inputProps={{ 'aria-label': 'role switch' }}
            />
            {role === 'photographer' && (
                <Typography sx={{ font: '400 1rem Geologica, sans-serif' }}>
                    of skill level
                </Typography>
            )}
            {role === 'photographer' && (
                <SkillSelect {...{ formData, setFormData }} />
            )}
        </Stack>
    );
}
