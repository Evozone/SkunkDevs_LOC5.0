// React
import React from 'react';

// Material UI - Components (named imports)
import { CardContent, Divider, Typography } from '@mui/material';

export default function VB_CardContent({ blog }) {
    return (
        <CardContent sx={{ px: 4 }}>
            {/* Title */}
            <Typography
                sx={{ fontFamily: 'Geologica, sans-serif' }}
                variant='h2'
            >
                {blog?.title}
            </Typography>

            {/* Created by and when */}
            <Typography
                variant='subtitle1'
                sx={{ fontFamily: 'Geologica, sans-serif', ml: 3 }}
                color='text.secondary'
            >
                by{' '}
                {`${blog?.authorName}  on   ${blog?.createdAt.split('T')[0]}`}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Content */}
            <div
                className='content'
                style={{
                    wordBreak: 'break-word',
                }}
                dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
        </CardContent>
    );
}
