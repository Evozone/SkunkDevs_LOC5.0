// React
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

// Material UI - Components
import { Box, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeComment from '@mui/icons-material/ModeComment';

// External Packages
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';

import {
    startLoading,
    stopLoading,
} from '../../../features/loading/loadingSlice';

// Components
import Hero from './Hero';
import AddPostButton from './addPost/AddPostButton';
import ImagePopup from './ImagePopup';

export default function Explore() {
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const category = useSelector((state) => state.explore.category);

    const observer = useRef();
    const [posts, setPosts] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        async function getPosts() {
            try {
                dispatch(startLoading());
                const postsFromServer = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/images/?filter=${category}`
                );
                setPosts(postsFromServer.data.data.result);
                console.log(posts);
                dispatch(stopLoading());
            } catch (err) {
                alert('Something went wrong');
                console.log(err);
                dispatch(stopLoading());
            }
        }
        getPosts();
    }, [category]);

    const lastPostRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNum((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );
    const handleImageClick = (post) => {
        setSelectedPost(post);
    };
    const handleClosePopup = () => {
        setSelectedPost(null);
    };

    return (
        <Box className='route-container'>
            <Hero />
            <Box
                sx={{
                    p: 3,
                    minHeight: '20vh',
                    placeItems: 'center',
                    backgroundColor: 'background.paper',
                }}
            >
                {/* Grid to display images */}
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    {posts &&
                        posts.map((post, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    onClick={() => handleImageClick(post)}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <img
                                        src={post.imageUrl}
                                        alt={`Image ${index}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            color: '#fff',
                                            display: 'block',
                                            transition: '0.3s ease',
                                            filter:
                                                hoverIndex === index
                                                    ? 'brightness(75%)'
                                                    : 'none',
                                        }}
                                    />
                                    {hoverIndex === index && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1.5rem',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <IconButton
                                                    sx={{ color: '#fff' }}
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {post.likes}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <IconButton
                                                    sx={{
                                                        color: '#fff',
                                                    }}
                                                >
                                                    <ModeComment />
                                                </IconButton>
                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {post.comments.length}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    {loading && <div>Loading...</div>}{' '}
                    {/* Add loading indicator */}
                    {!hasMore && <div>No more images</div>}{' '}
                    {/* Add message when there are no more images */}
                    <div
                        ref={lastPostRef}
                        style={{ width: '100%', height: '1px' }}
                    />{' '}
                    {/* Ref for infinite scroll */}
                </Grid>
            </Box>
            {isSignedIn && <AddPostButton {...{ posts, setPosts }} />}
            <ImagePopup
                open={!!selectedPost}
                handleClose={handleClosePopup}
                post={selectedPost}
            />
        </Box>
    );
}
