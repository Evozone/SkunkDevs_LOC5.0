import React, { useState, useRef } from 'react';
import {
    Button,
    Box,
    Modal,
    styled,
    TextField,
    Typography,
    CardMedia,
    Container,
    Chip,
    Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageKit from 'imagekit-javascript';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const SytledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000a1',
});

const PostModal = ({ toggleModalVisibility, modalVisibility }) => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const [imageSelected, setImageSelected] = useState(false);
    const [imageLocalURL, setImageLocalURL] = useState('');
    const [imageRemoteURL, setImageRemoteURL] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState([]);
    const inputRef = useRef(null);
    console.log(tags);
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

    const currentUser = useSelector((state) => state.currentUser);

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
        console.log(postTextValue);
        if (postTextValue.length > 200 || postTextValue.length === 0) {
            alert('Post description is not valid');
            return;
        }
        const auth = window.localStorage.getItem('photoApp');
        const { dnd } = JSON.parse(auth);
        const data = {
            imageURL: imageRemoteURL,
            thumbnailUrl,
            tags,
            description: postTextValue,
            createdAt: Date.now(),
            createdBy: currentUser.mid,
            uid: uuid(),
            comments: [],
            views: 0,
            monetizeType: 'free',
        };
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/explore/createPost`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <SytledModal
                open={modalVisibility}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                onClick={toggleModalVisibility}
            >
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={isSmUp ? { width: '470px' } : { width: '320px' }}
                        width={320}
                        minHeight={250}
                        maxHeight='80%'
                        bgcolor={'background.default'}
                        p={2}
                        // pt={1}
                        borderRadius={2}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Box
                            p={0}
                            m={0}
                            sx={
                                isSmUp ? { width: '424px' } : { width: '274px' }
                            }
                            display='flex'
                            justifyContent='right'
                        >
                            <CloseIcon
                                cursor='pointer'
                                onClick={toggleModalVisibility}
                            />
                        </Box>
                        <Typography lineHeight={2} variant='h6'>
                            Create New Post
                        </Typography>
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
                                <Grid item>
                                    <Chip
                                        key={tag}
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
                            sx={
                                isSmUp ? { width: '390px' } : { width: '240px' }
                            }
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
                    </Box>
                </form>
            </SytledModal>
        </React.Fragment>
    );
};

export default PostModal;
