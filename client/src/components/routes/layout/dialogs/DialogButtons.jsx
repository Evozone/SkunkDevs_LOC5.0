// React
import React from 'react';

// Material UI - Components
import { Stack } from '@mui/material';

// Components
import { StyledButton } from '../../../helpers/StyledMUI';

export default function DialogButtons({
    clearForm,
    buttonStatus = true,
    resource,
}) {
    return (
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <StyledButton
                variant='outlined'
                type='submit'
                color='success'
                disabled={!buttonStatus}
            >
                Create {resource}
            </StyledButton>
            <StyledButton
                variant='outlined'
                onClick={clearForm}
                color='warning'
            >
                Clear
            </StyledButton>
        </Stack>
    );
}
