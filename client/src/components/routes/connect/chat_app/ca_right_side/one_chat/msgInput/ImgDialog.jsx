// React
import React from 'react';

// Material UI components
import { Stack, Dialog, IconButton, Tooltip } from '@mui/material';

// Material UI icons
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

// Styled components
import { StyledButton } from '../../../../../../helpers/StyledMUI';

export default function ImgDialog({
    imageModal,
    handleCloseImgModal,
    imgLocalURL,
    handleSendImage,
}) {
    return (
        <Dialog
            open={imageModal}
            onClose={handleCloseImgModal}
            maxWidth='md'
            fullWidth
        >
            <Stack
                justifyContent='center'
                alignItems='center'
                p={2}
                spacing={2}
            >
                <CancelIcon
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                    cursor='pointer'
                    onClick={handleCloseImgModal}
                />
                <img
                    style={{
                        objectFit: 'contain',
                        height: '100%',
                        maxHeight: '400px',
                        display: 'block',
                        border: '2px solid #000',
                    }}
                    alt='loading ...'
                    src={imgLocalURL}
                />
                <StyledButton onClick={handleSendImage} variant='outlined'>
                    Confirm and Send &nbsp;
                    <SendIcon />
                </StyledButton>
            </Stack>
        </Dialog>
    );
}
