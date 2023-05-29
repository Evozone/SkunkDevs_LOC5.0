import { useState, useEffect, useCallback, useRef } from 'react';
import ExploreSearch from './ExploreSearch';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import {
    lMode1,
    lMode2,
    lMode3,
    lMode4,
    lMode5,
    lMode6,
    dMode1,
    dMode2,
    dMode3,
    dMode4,
    dMode5,
    dMode6,
} from '../utils/colors';
import AddPostModal from './AddPostModal';
import axios from 'axios';
import { Box } from '@mui/system';
import { startLoading, stopLoading } from '../features/loading/loadingSlice';

export default function Explore({ mode, themeChange }) {
    const dispatch = useDispatch();
    const [modalVisibility, setModalVisibility] = useState(false);

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
        <>
            {/* console.log(postsFromServer.data.data.result); */}
            {/* Use the above to get images */}
            <Box
                sx={{
                    pt: '5rem',
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                    minHeight: '100vh',
                }}
            >
                <Box
                    sx={{
                        mb: '15rem',
                        top: '0',
                        left: '0',
                        width: '100%',
                        zIndex: '100',
                    }}
                >
                    <ExploreSearch
                        filters={filters}
                        setFilters={setFilters}
                        mode={mode}
                        setPosts={setPosts}
                        posts={posts}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gridGap: '1rem',
                        placeItems: 'center',
                        padding: '0rem',
                        maxWidth: '1200px',
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
            </Box>

            <Tooltip title='Post an Image'>
                <Fab
                    color='primary'
                    aria-label='add'
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
            </Tooltip>
            <AddPostModal
                toggleModalVisibility={toggleModalVisibility}
                modalVisibility={modalVisibility}
            />
        </>
    );
}
