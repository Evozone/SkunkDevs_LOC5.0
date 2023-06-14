// React
import React, { useState } from 'react';

// Material-UI Components
import { Stack, Typography } from '@mui/material';

// Custom Components
import { StyledButton } from '../../../../helpers/StyledMUI';

// External Packages
import { v4 as uuid } from 'uuid';

// Appwrite
import storage from '../../../../../appwrite';

export default function ASD_ImgInput({ form, setForm }) {
    const [uploading, setUploading] = useState(false);
    // Upload image and get url after uploading to appwrite storage
    const uploadImg = async (e) => {
        if (e.target.files[0]) {
            if (!e.target.files[0].type.match('image.*')) {
                alert('Please select an image');
                return;
            }
            // Get file and generate fileId
            const file = e.target.files[0];
            const fileId = uuid();

            // Upload file to appwrite storage
            try {
                setUploading(true);
                await storage.createFile(
                    import.meta.env.VITE_APPWRITE_BUCKET_ID,
                    fileId,
                    file
                );

                const result = storage.getFilePreview(
                    import.meta.env.VITE_APPWRITE_BUCKET_ID,
                    fileId
                );

                // Set form.coverImgURL to the url of the uploaded image
                setForm((prev) => ({ ...prev, coverImgURL: result.href }));
                setUploading(false);
            } catch (err) {
                console.log(err);
                alert('Something went wrong, please try again later.');
            }
        }
    };

    // Generate image from Unsplash API
    const genUnsplashImg = async () => {
        try {
            const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
            const res = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=photography&orientation=landscape`
            );
            const data = await res.json();
            const url = data.urls.regular;
            setForm((prev) => ({ ...prev, coverImgURL: url }));
        } catch (err) {
            console.log(err);
            alert('Something went wrong, please try again later.');
        }
    };

    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
            {/* Drag image or upload */}
            <Typography variant='h5'>Cover Image</Typography>

            {/* Show image if image is set */}
            {form.coverImgURL ? (
                <img
                    src={form.coverImgURL}
                    alt='cover'
                    style={{
                        width: '400px',
                        height: 'auto',
                        objectFit: 'cover',
                    }}
                />
            ) : uploading ? (
                <Typography variant='body1'>Uploading...</Typography>
            ) : (
                <Typography variant='body1'>
                    Upload an image or generate one
                </Typography>
            )}
            <Stack direction='row' sx={{ width: '100%' }}>
                {/* Upload image button */}
                <StyledButton
                    component='label'
                    variant='outlined'
                    sx={{ mr: '1rem' }}
                    color='primary'
                >
                    <input
                        type='file'
                        accept='image/*'
                        hidden
                        onChange={uploadImg}
                    />
                    Upload Image
                </StyledButton>

                {/* Generate image button */}
                <StyledButton
                    variant='outlined'
                    onClick={genUnsplashImg}
                    sx={{ mr: '1rem' }}
                >
                    Generate Image
                </StyledButton>
            </Stack>
        </Stack>
    );
}
