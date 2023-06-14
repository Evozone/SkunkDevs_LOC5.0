// React
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components
import { Box, Fab, Stack } from '@mui/material';

// MUI Icons
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreateIcon from '@mui/icons-material/Create';

// Components
import RouteHeader from '../layout/RouteHeader';
import RouteContent from '../layout/RouteContent';

// External Libraries
import axios from 'axios';

function Blogs() {
    const navigate = useNavigate();

    const observer = useRef();
    const [blogs, setBlogs] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const goToCreateBlog = () => {
        navigate('/blogs/create');
    };

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoading(true);
                const blogsFromServer = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/blogs/?page=${pageNum}`
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
    }, []);

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
        <Box className='route-container'>
            <RouteHeader
                title='Blogs'
                icon={<PostAddIcon sx={{ fontSize: 60 }} />}
            />
            <RouteContent>
                {blogs && (
                    <Stack spacing={2}>
                        {blogs.map((blog, index) => {
                            if (blogs.length === index + 1) {
                                return (
                                    <div
                                        ref={lastBlogRef}
                                        key={blog._id}
                                        onClick={() => handleClick(blog._id)}
                                        className='blog-card'
                                    >
                                        <h2>{blog.title}</h2>
                                        <p>{blog.summary}</p>
                                        <p>{blog.authorName}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={blog._id}
                                        onClick={() => handleClick(blog._id)}
                                        className='blog-card'
                                    >
                                        <h2>{blog.title}</h2>
                                        <p>{blog.description}</p>
                                        <p>{blog.author}</p>
                                    </div>
                                );
                            }
                        })}
                    </Stack>
                )}
            </RouteContent>
            <Fab
                variant='extended'
                onClick={goToCreateBlog}
                color='primary'
                aria-label='Create a new blog'
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                }}
            >
                <CreateIcon /> &nbsp;&nbsp; Create
            </Fab>
        </Box>
    );
}

export default Blogs;
