// React
import React from 'react';

// Material UI - Components
import { Stack } from '@mui/material';

// Material UI - Icons
import { Save, Undo } from '@mui/icons-material';

// Components
import { StyledButton } from '../../../helpers/StyledMUI';

export default function EB_Actions({ clearChanges, resource }) {
    return (
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <StyledButton variant='outlined' type='submit' color='success'>
                <Save /> &nbsp; Edit {resource}
            </StyledButton>
            <StyledButton
                variant='outlined'
                onClick={clearChanges}
                color='warning'
            >
                <Undo /> &nbsp; Undo Changes
            </StyledButton>
        </Stack>
    );
}
