// React
import React, { useState } from 'react';

// Material-UI Components
import { Stack, Typography } from '@mui/material';

// External Packages
import { v4 as uuid } from 'uuid';

// Appwrite Storage
import storage from '../../../../appwrite';

// Custom Components
import { StyledButton } from '../../../helpers/StyledMUI';

export default function CB_ImgInputs({
    blogForm,
    setBlogForm,
    setButtonStatus,
}) {
    const [uploadStatus, setUploadStatus] = useState(null);

    // Uploading the cover image to Appwrite Storage
    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            if (!e.target.files[0].type.match('image.*')) {
                alert('Please select an image');
                return;
            }
            setUploadStatus('Uploading...');
            const id = uuid();
            await storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                id,
                e.target.files[0]
            );

            const result = storage.getFilePreview(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                id
            );
            setUploadStatus('Uploaded successfully ✅');
            setBlogForm((prev) => {
                return {
                    ...prev,
                    coverUrl: result.href,
                };
            });
            setButtonStatus(true);
        }
    };

    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
            {/* Drag image or upload */}
            <Typography variant='h5'>Cover Image</Typography>
            {/* Show image if image is set */}
            {blogForm.coverUrl ? (
                <img
                    src={blogForm.coverUrl}
                    alt='cover'
                    style={{
                        width: '400px',
                        height: 'auto',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <Typography variant='body1'>
                    Upload a cover image for your blog
                </Typography>
            )}
            {uploadStatus && (
                <Typography variant='body1'>{uploadStatus}</Typography>
            )}
            {/* Upload image button */}
            <StyledButton
                component='label'
                variant='outlined'
                sx={{ width: 'fit-content' }}
                color='primary'
            >
                <input
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={handleImageChange}
                />
                Upload Image
            </StyledButton>
        </Stack>
    );
}
