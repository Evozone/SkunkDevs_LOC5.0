// ImagePopup.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    Box,
    Dialog,
    Grid,
    IconButton,
    Typography,
    TextField,
    List,
    Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';

const ImagePopup = ({ open, handleClose, post, setPosts }) => {
    const [curComment, setCurComment] = useState('');
    const [isLikedState, setIsLikedState] = useState({
        isLiked: false,
        likesCount: 0,
    });
    //check whether the post is liked by the user
    const { uid } = useSelector((state) => state.auth);
    useEffect(() => {
        const liked = post?.likes.some((like) => like.likeBy == uid);
        setIsLikedState({ isLiked: liked, likesCount: post?.likes.length });
    }, [post]);
    const dnd = window.localStorage.getItem('photoApp');
    const handleLike = async () => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/images/comment/like/${
                    post._id
                }`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${dnd}`,
                    },
                }
            );
            if (result.data.success) {
                setPosts((prevPosts) =>
                    prevPosts.map((p) =>
                        p._id === post._id && p.likes
                            ? {
                                  ...p,
                                  likes: isLikedState.isLiked
                                      ? p.likes.filter(
                                            (like) => like.likeBy !== uid
                                        )
                                      : [...p.likes, { likeBy: uid }],
                              }
                            : p
                    )
                );
                setIsLikedState((prev) => ({
                    isLiked: !prev.isLiked,
                    likesCount: prev.isLiked
                        ? prev.likesCount - 1
                        : prev.likesCount + 1,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleCommentSubmit = async () => {
        const formData = new FormData();
        formData.append('commentText', curComment);
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/images/comment/${
                    post._id
                }`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${dnd}`,
                    },
                }
            );
            setCurComment('');

            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p._id === post._id
                        ? {
                              ...p,
                              comments: [
                                  ...p.comments,
                                  result.data.data.comments,
                              ], // Add the new comment to the existing comments array
                          }
                        : p
                )
            );
            post.comments.push(result.data.data.comments);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        post && (
            <Dialog open={open} onClose={handleClose}>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={6}
                            sx={{ position: 'sticky', left: 0, top: 0 }}
                        >
                            <img
                                src={post.imageUrl}
                                alt={`Image`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <Box p={0}>
                                <Typography variant='subtitle1' gutterBottom>
                                    {post.description}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom
                                    sx={{ color: '#1a73e8' }}
                                >
                                    {post.tags}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <List>
                                    {post.comments &&
                                        post.comments.map((comment, index) => (
                                            <Comment
                                                key={index}
                                                comment={comment}
                                            /> // Map each comment to the Comment component
                                        ))}
                                </List>

                                <Box
                                    sx={{
                                        position: 'sticky',
                                        bottom: 0,
                                        backgroundColor: '#fff',
                                        padding: '10px',
                                        borderTop:
                                            post.comments &&
                                            post.comments.length > 0
                                                ? '1px solid #ccc'
                                                : 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IconButton
                                            sx={{ color: '#000' }}
                                            onClick={handleLike}
                                        >
                                            {isLikedState.isLiked ? (
                                                <FavoriteIcon />
                                            ) : (
                                                <FavoriteBorderIcon />
                                            )}
                                        </IconButton>
                                        <Typography variant='body2'>
                                            {isLikedState.likesCount} Likes
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextField
                                            label='Add a comment'
                                            variant='outlined'
                                            fullWidth
                                            size='small'
                                            InputProps={{
                                                sx: { borderRadius: '0px' },
                                                height: '40px',
                                            }} // Adjust the spacing as needed
                                            value={curComment}
                                            onChange={(e) =>
                                                setCurComment(e.target.value)
                                            }
                                        />
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            startIcon={<SendIcon />}
                                            style={{
                                                borderRadius: '0px',
                                                height: '40px',
                                            }} // Adjust the spacing as needed
                                            onClick={handleCommentSubmit}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        )
    );
};

export default ImagePopup;
