import { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Tooltip,
    IconButton,
    MenuItem,
    Select,
    Button,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../features/notify/notifySlice';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import storage from '../../../appwrite';

const AddPostInterface = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.auth.uid);

    const [image, setImage] = useState(null);
    const [localURL, setLocalURL] = useState('');
    const [postForm, setPostForm] = useState({
        imageUrl: '',
        thumbnailUrl: '',
        altText: '',
        description: '',
        tags: '',
        monetizeType: 'free',
        // parentCollection: '',
    });

    // Uploading the cover image to Appwrite Storage
    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            if (!e.target.files[0].type.match('image.*')) {
                alert('Please select an image');
                return;
            }
        }
        setImage(e.target.files[0]);
        const imageSrc = URL.createObjectURL(e.target.files[0]);
        setLocalURL(imageSrc);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dnd = window.localStorage.getItem('photoApp');

        const formData = new FormData();
        formData.append('description', postForm.description);
        formData.append('tags', postForm.tags);
        formData.append('monetizeType', postForm.monetizeType);
        formData.append('createdBy', userId);
        formData.append('altText', postForm.altText);

        try {
            const id = uuid();
            await storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                id,
                image
            );
            const result = storage.getFilePreview(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                id
            );
            formData.append('imageUrl', result.href);

            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${dnd}`,
                    },
                }
            );

            dispatch(
                notify({
                    open: true,
                    severity: 'success',
                    message: 'Post created successfully',
                })
            );
            navigate('/');
        } catch (error) {
            console.log(error);
            dispatch(
                notify({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong, please try again later',
                })
            );
        }
    };

    return (
        <Box sx={{ overflowY: 'auto', mt: 2, padding: '5rem', pt: 0 }}>
            <Paper
                sx={{
                    p: 2,
                    mt: 2,
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
                    borderRadius: '15px',
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        mb: 3,
                        mt: 3,
                        display: 'block',
                    }}
                >
                    {localURL && (
                        <img
                            src={localURL}
                            loading='lazy'
                            style={{
                                width: '100%',
                                minWidth: '100px',
                                maxHeight: '400px',
                                borderRadius: '10px',
                                objectFit: 'contain',
                                cursor: 'pointer',
                                minHeight: '50px',
                            }}
                        />
                    )}
                    <label
                        htmlFor='cover'
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                        }}
                    >
                        Choose an image -{' '}
                    </label>
                    <IconButton sx={{ pb: '4px' }}>
                        <label htmlFor='sendImage'>
                            <input
                                accept='image/*'
                                id='sendImage'
                                type='file'
                                hidden
                                onChange={handleImageChange}
                            />
                            <Tooltip title='Select an Image'>
                                <AddPhotoAlternate
                                    fontSize='large'
                                    sx={{ cursor: 'pointer' }}
                                />
                            </Tooltip>
                        </label>
                    </IconButton>
                </Box>

                <form onSubmit={handleSubmit}>
                    {/* Caption */}
                    <TextField
                        fullWidth
                        required
                        type='text'
                        name='description'
                        id='outlined-required'
                        label='Caption'
                        value={postForm.description}
                        multiline
                        onChange={(e) =>
                            setPostForm({
                                ...postForm,
                                description: e.target.value,
                            })
                        }
                        sx={{
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        type='text'
                        name='tags'
                        id='outlined-required'
                        label='Tags'
                        value={postForm.tags}
                        onChange={(e) =>
                            setPostForm({ ...postForm, tags: e.target.value })
                        }
                        sx={{
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        type='text'
                        id='outlined-required'
                        label='Alt Text'
                        name='altText'
                        value={postForm.altText}
                        onChange={(e) =>
                            setPostForm({
                                ...postForm,
                                altText: e.target.value,
                            })
                        }
                        sx={{
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    {/* Monetize Type */}
                    <label htmlFor='monetizeType'>Monetize Type</label>
                    <Select
                        id='monetizeType'
                        name='monetizeType'
                        value={postForm.monetizeType}
                        onChange={(e) =>
                            setPostForm({
                                ...postForm,
                                monetizeType: e.target.value,
                            })
                        }
                        label='Monetization Type'
                        sx={{
                            ml: 2,
                        }}
                    >
                        <MenuItem value='free'>Free</MenuItem>
                        <MenuItem value='premium'>Premium</MenuItem>
                    </Select>
                    <br />
                    <Button sx={{ mt: 4 }} type='submit' variant='outlined'>
                        Upload post
                    </Button>{' '}
                </form>
            </Paper>
        </Box>
    );
};
export default AddPostInterface;
