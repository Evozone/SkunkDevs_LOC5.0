// React
import React from 'react';
import { useNavigate } from 'react-router';

// MUI Components
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Divider,
} from '@mui/material';

export default function BlogCard({ blog, index, lastBlogRef = null }) {
    const navigate = useNavigate();

    // Get the mode
    const mode = localStorage.getItem('photoAppTheme') || 'light';

    // What happens when you click on a blog card
    const handleClick = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                cursor: 'pointer',
                borderRadius: 5,
                border: mode === 'light' ? '1px solid black' : 'none',
                '&:hover': { boxShadow: 10 },
            }}
            elevation={4}
            onClick={() => handleClick(blog._id)}
            ref={lastBlogRef}
        >
            <CardMedia
                component='img'
                height='180'
                image={blog.cover}
                alt={blog.title}
                sx={{ width: 320, objectFit: 'cover' }}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography
                    variant='h4'
                    component='div'
                    sx={{ fontFamily: 'Geologica, sans-serif' }}
                >
                    {blog.title.slice(0, 50) + '...'}
                </Typography>

                <Typography
                    gutterBottom
                    variant='subtitle1'
                    color='text.secondary'
                    sx={{ fontFamily: 'Geologica, sans-serif' }}
                >
                    {blog.authorName} | {blog.createdAt.slice(0, 10)}
                </Typography>

                <Divider sx={{ margin: '10px 0' }} />

                <Typography variant='body1' color='text.secondary'>
                    {blog.summary}
                </Typography>
            </CardContent>
        </Card>
    );
}
