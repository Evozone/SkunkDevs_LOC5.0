// React
import React, { useRef, useState, useEffect, useCallback } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Router
import { useNavigate } from 'react-router-dom';

// Material UI Components
import { Stack, Grid, Typography } from '@mui/material';

// External Libraries
import axios from 'axios';

// Custom Components
import { IslandBox, StyledButton } from '../../../../helpers/StyledMUI';

export default function UserPosts({ user }) {
    const [posts, setPosts] = useState(null);
    const currentUser = useSelector((state) => state.auth.uid);
    const navigate = useNavigate();

    // Mode
    const mode = localStorage.getItem('photoAppTheme');

    useEffect(() => {
        const getPosts = async () => {
            try {
                const userPosts = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/images?user=${
                        user?.uid
                    }`
                );
                setPosts(userPosts.data.data.result);
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, [user]);

    return (
        <IslandBox
            sx={{ backgroundColor: mode === 'light' ? 'grey.200' : 'grey.900' }}
        >
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                spacing={2}
            >
                <Typography variant='h5' gutterBottom>
                    {user?.name}'s Posts
                </Typography>
                {currentUser === user?.uid && (
                    <StyledButton
                        variant='outlined'
                        color='primary'
                        size='small'
                        onClick={() => navigate('/addPost')}
                    >
                        Make a new Post
                    </StyledButton>
                )}
            </Stack>
            {posts ? (
                <Grid container spacing={2}>
                    {posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
                            <img
                                src={post.imageUrl}
                                alt={post.altText}
                                style={{ width: '100%', borderRadius: '5px' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant='body1'>No posts yet</Typography>
            )}
        </IslandBox>
    );
}
