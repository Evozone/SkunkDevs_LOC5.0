// React
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// Material UI - Components (named imports)
import { Box, Card, CardMedia } from '@mui/material';

// External Packages
import axios from 'axios';

// Components
import VB_CardContent from './VB_CardContent';
import VB_CardActions from './VB_CardActions';

function ViewBlog() {
    const params = useParams();
    const blogId = params.id;

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/blogs/${blogId}`
            );
            setBlog(data.result);
        };
        fetchBlog();
    }, [blogId]);

    return (
        <Box className='route-container'>
            {/* Padding for Navbar */}
            <Box sx={{ height: '65px' }} />

            {/* Actual blog */}
            <Card elevation={0} sx={{ borderRadius: '0px' }}>
                {/* Cover */}
                <CardMedia
                    component='img'
                    alt={blog?.title}
                    height='350px'
                    image={blog?.cover}
                />

                {/* Text */}
                <VB_CardContent {...{ blog }} />

                {/* Actions */}
                <VB_CardActions {...{ blog, blogId }} />
            </Card>
        </Box>
    );
}

export default ViewBlog;
