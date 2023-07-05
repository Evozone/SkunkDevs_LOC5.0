// React
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

// Material UI - Components
import { Box } from '@mui/system';

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
                    }/api/explore/getPostsByFilter/?filter=${filters}`
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
    }, [filters]);

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
            ></Box>
            {isSignedIn && <AddPostButton {...{ posts, setPosts }} />}
        </Box>
    );
}
