// React
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

// Material UI - Components
import { Box, Grid } from '@mui/material';

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

export default function Explore() {
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    const observer = useRef();
    const [posts, setPosts] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState('Free');

    useEffect(() => {
        async function getPosts() {
            try {
                dispatch(startLoading());
                const postsFromServer = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/images/?filter=${filters}`
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
    }, []);

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
                {posts && posts.map((post, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <img src={post.imageUrl} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                ))}
                {loading && <div>Loading...</div>} {/* Add loading indicator */}
                {!hasMore && <div>No more images</div>} {/* Add message when there are no more images */}
                <div ref={lastPostRef} style={{ width: '100%', height: '1px' }} /> {/* Ref for infinite scroll */}
            </Grid>
            
            </Box>
            {isSignedIn && <AddPostButton {...{ posts, setPosts }} />}


</Box>
    ); 
}