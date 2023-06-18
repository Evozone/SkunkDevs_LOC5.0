// React
import { useState } from 'react';

import { Stack, TextField, IconButton, Tooltip } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import ImgDialog from './ImgDialog';

export default function MessageInput({
    handleSendMessage,
    inputRef,
    uploadFile,
    textfieldOnChange,
}) {
    const mode = window.localStorage.getItem('photoAppTheme') || 'light';

    const [imageModal, setImageModal] = useState(false);
    const [imgLocalURL, setImgLocalURL] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleImageInput = (e) => {
        const file = e?.target.files[0];
        if (file) {
            const fileExt = file?.name.split('.').pop();
            if (
                fileExt === 'jpg' ||
                fileExt === 'jpeg' ||
                fileExt === 'png' ||
                fileExt === 'gif'
            ) {
                const localUrl = URL.createObjectURL(file);
                setImgLocalURL(localUrl);
                setImageFile(file);
                setImageModal(true);
                e.target.value = '';
            } else {
                alert(
                    'Please upload a valid image file of type jpg, jpeg, png or gif'
                );
            }
        }
    };

    const handleCloseImgModal = () => {
        setImageModal(false);
        setImgLocalURL('');
        setImageFile(null);
    };

    const handleSendImage = () => {
        uploadFile(imageFile);
        handleCloseImgModal();
    };

    const handleKey = (e) => {
        const text = inputRef.current.value;
        e.code === 'Enter' && !e.shiftKey && handleSendMessage(text, false);
    };

    const handleSendMsg = () => {
        const text = inputRef.current.value;
        handleSendMessage(text);
    };

    return (
        <>
            <ImgDialog
                {...{
                    imageModal,
                    handleCloseImgModal,
                    imgLocalURL,
                    handleSendImage,
                }}
            />
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                p={1}
                sx={{
                    backgroundColor: mode === 'dark' ? 'grey.900' : 'grey.300',
                    borderRadius: '0 0 20px 20px',
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                }}
            >
                <TextField
                    inputRef={inputRef}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            paddingRight: '6px',
                            borderRadius: '20px',
                            fontFamily: 'Helvetica',
                        },
                    }}
                    size='small'
                    multiline
                    maxRows={10}
                    placeholder='Hit Enter to send message'
                    autoFocus
                    onKeyDown={handleKey}
                    onChange={textfieldOnChange}
                />
                <IconButton sx={{ pb: '4px' }}>
                    <label htmlFor='sendImage'>
                        <input
                            accept='image/*'
                            id='sendImage'
                            type='file'
                            hidden
                            onChange={handleImageInput}
                        />
                        <Tooltip title='Select an Image'>
                            <ImageIcon sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </label>
                </IconButton>
                <IconButton onClick={handleSendMsg}>
                    <Tooltip title='Hit Ctrl + Enter to send'>
                        <SendIcon />
                    </Tooltip>
                </IconButton>
            </Stack>
        </>
    );
}
