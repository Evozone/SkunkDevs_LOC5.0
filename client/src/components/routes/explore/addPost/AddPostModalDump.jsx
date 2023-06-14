// React
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// Material UI - Components
import {
    FormControl,
    Button,
    Box,
    TextField,
    Typography,
    CardMedia,
    Container,
    Chip,
    Grid,
} from '@mui/material';

// Material UI - Icons
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

// External Packages
import ImageKit from 'imagekit-javascript';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { v4 as uuid } from 'uuid';

// Media Queries
import useMediaQuery from '@mui/material/useMediaQuery';

// Theme
import { useTheme } from '@mui/material';

// Components
import DialogHead from '../../layout/dialogs/DialogHead';

const PostModal = ({
    post,
    setPost,
    setPosts,
    handleClose,
    setExploreDialog,
}) => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const [imageSelected, setImageSelected] = useState(false);
    const [imageLocalURL, setImageLocalURL] = useState('');
    const [imageRemoteURL, setImageRemoteURL] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [imageType, setImageType] = useState('Free');
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState([]);
    const inputRef = useRef(null);
    function handleDelete(tagToDelete) {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    function handleAddTag() {
        const newTag = inputRef.current.value;
        setTags([...tags, newTag]);
        inputRef.current.value = '';
    }

    const CHARACTER_LIMIT = 200;
    const [characterCount, setCharacterCount] = useState(0);
    const handleInputChange = (e) => {
        setCharacterCount(e.target.value.length);
    };

    const currentUser = useSelector((state) => state.auth);

    const postText = useRef();

    const handleImageInput = async (e) => {
        if (imageSelected) {
            alert('At a time only 1 image can be uploaded');
            return;
        }
        const file = e.target.files[0];
        if (file) {
            setImageSelected(true);
            const photoURL = URL.createObjectURL(file);
            setImageLocalURL(photoURL);
            setImageFile(file);
            var ik = new ImageKit({
                publicKey: 'public_ex06kCH1pb+piK6HrBm0N+Lc1JM=',
                urlEndpoint: 'https://ik.imagekit.io/senddffrt',
                authenticationEndpoint: 'http://localhost:5000/auth',
            });

            ik.upload(
                {
                    file,
                    fileName: 'my-image.jpg',
                    folder: '/my-folder',
                    extensions: [
                        {
                            name: 'aws-auto-tagging',
                            minConfidence: 80, // only tags with a confidence value higher than 80% will be attached
                            maxTags: 2, // a maximum of 10 tags from aws will be attached
                        },
                        {
                            name: 'google-auto-tagging',
                            minConfidence: 70, // only tags with a confidence value higher than 70% will be attached
                            maxTags: 2, // a maximum of 10 tags from google will be attached
                        },
                    ],
                },
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const tagsArray = result.AITags.map((res) => res.name);
                    setImageRemoteURL(result.url);
                    setThumbnailUrl(result.thumbnailUrl);
                    setTags(tagsArray);
                }
            );
        }
    };

    const cancelSelectedImage = () => {
        setImageSelected(false);
        setImageFile(null);
        setImageLocalURL('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postTextValue = postText.current.value;
        if (postTextValue.length > 200 || postTextValue.length === 0) {
            alert('Post description is not valid');
            return;
        }
        let assignId = uuid();
        const auth = window.localStorage.getItem('photoApp');
        const { dnd } = jwtDecode(auth);
        const data = {
            imageURL: imageRemoteURL,
            thumbnailUrl,
            tags,
            description: postTextValue,
            createdAt: Date.now(),
            createdBy: currentUser.mid,
            uid: assignId,
            comments: [],
            views: 0,
            monetizeType: imageType,
        };
        try {
            const response = await axios({
                method: 'POST',
                url: `${
                    import.meta.env.VITE_SERVER_URL
                }/api/explore/createPost`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            console.log(response);
            alert('Post created successfully');
            toggleModalVisibility();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormControl
            component='form'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
            }}
            onSubmit={handleSubmit}
        >
            {/* Head */}
            <DialogHead {...{ handleClose, title: 'Create Post' }} />
            <TextField
                sx={{
                    width: '100%',
                    flexGrow: 1,
                    pt: 0.6,
                    '& .MuiOutlinedInput-root': {
                        p: '10px',
                        '&.Mui-focused fieldset': {
                            borderColor: 'black',
                        },
                    },
                }}
                autoFocus
                multiline
                id='postText'
                inputRef={postText}
                placeholder='post description'
                maxRows={6}
                variant='outlined'
                color='primary'
                focused
                inputProps={{
                    maxLength: CHARACTER_LIMIT,
                }}
                helperText={`${characterCount}/${CHARACTER_LIMIT}`}
                onChange={handleInputChange}
            />
            {imageSelected && (
                <Container sx={{ position: 'relative' }}>
                    <CardMedia
                        sx={{
                            objectFit: 'contain',
                            maxHeight: 270,
                            display: 'block',
                        }}
                        component='img'
                        image={imageLocalURL}
                    />
                    <CancelIcon
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                        cursor='pointer'
                        onClick={cancelSelectedImage}
                    />
                </Container>
            )}
            <Grid
                container
                spacing={1}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid item>
                    <label htmlFor='postPhoto'>
                        <ImageIcon
                            sx={{
                                marginTop: '5px',
                                marginLeft: '9px',
                            }}
                            fontSize='large'
                            color='primary'
                            cursor='pointer'
                        />
                    </label>
                    <input
                        accept='image/*'
                        id='postPhoto'
                        type='file'
                        style={{ display: 'none' }}
                        onChange={handleImageInput}
                    />
                </Grid>
                {tags.map((tag) => (
                    <Grid item key={uuid()}>
                        <Chip
                            key={uuid()}
                            label={tag}
                            onDelete={() => handleDelete(tag)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box my={2}>
                <input type='text' ref={inputRef} />
                <Button size='small' onClick={handleAddTag}>
                    Add tag
                </Button>
            </Box>
            <Box
                mx={4}
                my={0}
                sx={isSmUp ? { width: '390px' } : { width: '240px' }}
                display='flex'
                justifyContent='right'
            >
                <Button
                    disableElevation
                    size='medium'
                    variant='contained'
                    endIcon={<SendIcon />}
                    type='submit'
                >
                    Post
                </Button>
            </Box>
        </FormControl>
    );
};

export default PostModal;
