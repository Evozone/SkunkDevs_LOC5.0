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
import BlogCard from './BlogCard';

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
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        {blogs.map((blog, index) => {
                            if (blogs.length === index + 1) {
                                return (
                                    <BlogCard
                                        key={blog._id}
                                        blog={blog}
                                        ref={lastBlogRef}
                                    />
                                );
                            } else {
                                return <BlogCard key={blog._id} blog={blog} />;
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
                <CreateIcon /> &nbsp;&nbsp; Create a new blog
            </Fab>
        </Box>
    );
}

export default Blogs;
