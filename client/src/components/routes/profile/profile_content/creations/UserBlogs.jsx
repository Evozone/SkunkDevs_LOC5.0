// React
import React, { useRef, useState, useEffect, useCallback } from 'react';

// Material UI Components
import { Typography, Stack } from '@mui/material';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

// External Libraries
import axios from 'axios';

// Custom Components
import BlogCard from '../../../blogs/BlogCard';
import { IslandBox, StyledButton } from '../../../../helpers/StyledMUI';

export default function UserBlogs({ user }) {
    const observer = useRef();
    const [blogs, setBlogs] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Mode
    const mode = localStorage.getItem('photoAppTheme');
    const currentUser = useSelector((state) => state.auth.uid);
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoading(true);
                const blogsFromServer = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/blogs/?page=${pageNum}&author=${user?.uid}`
                );
                setBlogs(blogsFromServer.data.result);
                if (blogsFromServer.data.result.length < 6) {
                    setHasMore(false);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getBlogs();
    }, [pageNum, user]);

    const lastBlogRef = useCallback(
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
                <Typography variant='h5' sx={{ mb: '1rem' }}>
                    {user?.name}'s Blogs
                </Typography>

                {currentUser === user?.uid && (
                    <StyledButton
                        variant='outlined'
                        color='primary'
                        size='small'
                        onClick={() => navigate('/blogs/create')}
                    >
                        Make a new Blog
                    </StyledButton>
                )}
            </Stack>
            {blogs ? (
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {blogs.map((blog, index) => {
                        if (blogs.length === index + 1) {
                            return <BlogCard key={blog._id} blog={blog} />;
                        } else {
                            return <BlogCard key={blog._id} blog={blog} />;
                        }
                    })}
                </Stack>
            ) : (
                <Typography variant='body1'>No blogs yet</Typography>
            )}
        </IslandBox>
    );
}
