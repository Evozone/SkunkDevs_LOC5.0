// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../../features/notify/notifySlice';

// Material UI - Components (named imports)
import { CardActions, Stack } from '@mui/material';

// External Packages
import axios from 'axios';

// Components
import { StyledButton } from '../../../helpers/StyledMUI';

export default function VB_CardActions({ blog, blogId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get the current user
    const currentUser = useSelector((state) => state.auth);

    const deleteBlog = async () => {
        const choice = window.confirm('Are you sure you want to delete?');
        if (!choice) return;
        const dnd = window.localStorage.getItem('photoApp');
        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/api/blogs/${blogId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${dnd}`,
                    },
                }
            );
            dispatch(notify({ open: true, type: 'success', msg: 'Deleted!' }));
            navigate('/blogs');
        } catch (error) {
            console.log(error);
            dispatch(
                notify(true, 'error', 'Sorry :( but something went wrong!')
            );
        }
    };

    // Navigate to edit blog page
    const goToEditBlog = () => {
        navigate(`/blog/${blogId}/edit`, {
            state: {
                blog,
            },
        });
    };

    const buttons = [
        { name: 'Edit this blog', onClick: goToEditBlog, color: 'info' },
        { name: 'Delete', onClick: deleteBlog, color: 'error' },
    ];

    return (
        <CardActions sx={{ px: 3, pb: 3 }}>
            {blog?.authorId === currentUser.uid && (
                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='flex-end'
                    sx={{ width: '100%' }}
                >
                    {buttons.map((button) => (
                        <StyledButton
                            variant='outlined'
                            key={button.name}
                            {...button}
                        >
                            {button.name}
                        </StyledButton>
                    ))}
                </Stack>
            )}
        </CardActions>
    );
}
