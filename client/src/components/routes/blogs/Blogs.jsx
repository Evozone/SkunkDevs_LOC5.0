import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

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
} from '../../../utils/colors';
import { Tooltip } from '@mui/material';

function Blogs({ mode }) {
    const navigate = useNavigate();

    const observer = useRef();
    const [blogs, setBlogs] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoading(true);
                const blogsFromServer = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/blog/getList/?page=${pageNum}`
                );
                setBlogs((prev) => {
                    if (!prev || prev.length === 0) {
                        return blogsFromServer.data.result;
                    } else {
                        return [...prev, ...blogsFromServer.data.result];
                    }
                });
                if (blogsFromServer.data.result.length < 6) {
                    setHasMore(false);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getBlogs();
    }, [pageNum]);

    const handleClick = (id) => {
        navigate(`/blog/${id}`);
    };

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
        <Box
            sx={{
                overflowY: 'auto',
                minHeight: '100vh',
                backgroundColor: mode === 'light' ? 'whitesmoke' : '#121212',
                padding: '5rem',
                display: 'flex',
                flexDirection: 'column',
                pt: 0,
            }}
        >
            <Typography
                variant='h1'
                component='h2'
                sx={{
                    color: mode === 'light' ? lMode3 : dMode3,
                    margin: '2rem',
                    marginTop: '5rem',
                    fontWeight: 'bold',
                    fontSize: '3rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                Read Blogs
                <ChromeReaderModeIcon
                    sx={{ fontSize: '3rem', marginLeft: '1rem' }}
                />
            </Typography>

            <Typography
                variant='h2'
                component='h3'
                sx={{
                    color: mode === 'light' ? lMode2 : dMode2,
                    margin: '2rem',
                    fontFamily: 'Work Sans',
                    fontWeight: 'medium',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                You can share your experience or read others' experiences here.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridGap: '2rem',
                }}
            >
                {blogs &&
                    blogs.map((blog, index) => {
                        return (
                            <Card
                                ref={lastBlogRef}
                                key={blog._id}
                                sx={{
                                    backgroundColor:
                                        mode === 'light' ? lMode2 : dMode2,
                                    color: mode === 'light' ? lMode6 : dMode6,
                                    borderRadius: '10px',
                                    border:
                                        mode === 'light'
                                            ? 'none'
                                            : `1px solid ${lMode3.concat(
                                                  'aa'
                                              )}`,
                                    width: '100%',
                                    maxHeight: '420px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleClick(blog._id)}
                            >
                                <CardMedia
                                    component='img'
                                    height='270px'
                                    image={blog.cover}
                                />
                                <CardContent
                                    sx={{
                                        flex: '1',
                                    }}
                                >
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? lMode1
                                                    : dMode1,
                                            font: '600 1.5rem Poppins, sans-serif',
                                            mb: 1,
                                        }}
                                    >
                                        {blog.title}
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        color='textSecondary'
                                        sx={{
                                            mb: 1,
                                        }}
                                    >
                                        by{' '}
                                        {`${blog.authorName}  on   ${
                                            blog.createdAt.split('T')[0]
                                        }`}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            wordBreak: 'breakWord',
                                            font: '400 1rem/1.5rem Work Sans, sans-serif',
                                        }}
                                    >
                                        {blog.summary}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
            </Box>
            {loading && (
                <img
                    style={{ alignSelf: 'center', width: '160px' }}
                    src='/assets/vectors/load-more.svg'
                    alt=''
                />
            )}
            <Tooltip title='Create a new Blog'>
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
                    onClick={() => navigate('/createBlog')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}

export default Blogs;
