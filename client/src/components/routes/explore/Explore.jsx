import { useState, useEffect, useCallback, useRef } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import heroImg from '../../../assets/hero.jpg';

import { lMode3, lMode4, dMode3, dMode4 } from '../../../utils/colors';
import AddPostModal from './AddPostModal';
import axios from 'axios';
import { Box } from '@mui/system';
import {
    startLoading,
    stopLoading,
} from '../../../features/loading/loadingSlice';
import GlobalSearch from '../../navbar/search/GlobalSearch';

export default function Explore({ mode }) {
    const dispatch = useDispatch();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [showSearch, setShowSearch] = useState(true);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const observer = useRef();
    const [posts, setPosts] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState('Free');

    // useEffect(() => {
    //     async function getPosts() {
    //         try {
    //             dispatch(startLoading());
    //             const postsFromServer = await axios.get(
    //                 `${import.meta.env.VITE_SERVER_URL}/api/explore/getPosts/?page=${pageNum}`
    //             );
    //             setPosts((prev) => {
    //                 if (!prev || prev.length === 0) {
    //                     return postsFromServer.data.data.result;
    //                 } else {
    //                     return [...prev, ...postsFromServer.data.data.result];
    //                 }
    //             });
    //             console.log(posts);
    //             if (postsFromServer.data.data.result.length < 10) {
    //                 setHasMore(false);
    //             }
    //             setLoading(false);
    //             dispatch(stopLoading())
    //         } catch (err) {
    //             console.log(err);
    //             dispatch(stopLoading())
    //         }
    //     }
    //     getPosts();
    // }, [modalVisibility, pageNum]);

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
    }, [filters, modalVisibility]);

    useEffect(() => {
        function checkScroll() {
            if (window.scrollY > 0) {
                setShowSearch(false);
            } else {
                setShowSearch(true);
            }
        }

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
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
        <Box sx={{ minHeight: '100vh', position: 'relative' }}>
            <Box
                sx={{
                    pt: '5rem',
                    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImg}) no-repeat center center/cover`,
                    minHeight: '80vh',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                {showSearch && <GlobalSearch />}
            </Box>
            <Box
                sx={{
                    p: 3,
                    backgroundColor: 'whitesmoke',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gridGap: '1rem',
                    placeItems: 'center',
                }}
            >
                {posts &&
                    posts.map((post, index) => {
                        if (posts.length === index + 1) {
                            if (post.monetizeType !== 'Free') {
                                return (
                                    <img
                                        src={`${post.imageUrl}?tr=ot-Shutter%Sphere,otc-FFFFFF,otbg-FF0000,or-4,otp-8_8,ox-1335,oy-980,ott-bold,ots-90`}
                                        alt='post'
                                        key={post._id}
                                        ref={lastPostRef}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '1rem',
                                        }}
                                    />
                                );
                            }
                            return (
                                <img
                                    src={post.imageUrl}
                                    alt='post'
                                    key={post._id}
                                    ref={lastPostRef}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '1rem',
                                    }}
                                />
                            );
                        } else {
                            if (post.monetizeType !== 'Free') {
                                return (
                                    <img
                                        src={`${post.imageUrl}?tr=ot-Shutter%Sphere,otc-FFFFFF,otbg-FF0000,or-4,otp-8_8,ox-1335,oy-980,ott-bold,ots-90`}
                                        alt='post'
                                        key={post._id}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '1rem',
                                        }}
                                    />
                                );
                            }
                            return (
                                <img
                                    src={post.imageUrl}
                                    alt='post'
                                    key={post._id}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '1rem',
                                    }}
                                />
                            );
                        }
                    })}
            </Box>

            <Fab
                color='primary'
                aria-label='add a new post'
                sx={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    color: mode === 'light' ? 'white' : 'black',
                    backgroundColor: mode === 'light' ? lMode4 : dMode4,

                    borderRadius: '50%',
                    height: '3rem',
                    width: '3rem',

                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',

                    boxShadow: '0 0 10px 0 rgba(78,135,140, 0.5)',

                    '&:hover': {
                        backgroundColor: mode === 'light' ? lMode3 : dMode3,
                        color: mode === 'light' ? 'white' : 'black',
                        transform: 'scale(1.1) rotate(90deg)',
                        transition: 'transform 0.2s ease-in-out',
                    },
                }}
                onClick={toggleModalVisibility}
            >
                <AddIcon />
            </Fab>
            <AddPostModal
                toggleModalVisibility={toggleModalVisibility}
                modalVisibility={modalVisibility}
            />
        </Box>
    );
}
