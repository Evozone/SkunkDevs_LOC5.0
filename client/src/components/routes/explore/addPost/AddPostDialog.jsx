// React
import React from 'react';

// Material UI - Components
import { FormControl, Stack } from '@mui/material';

// Components
import DialogHead from '../../layout/dialogs/DialogHead';
import { StyledButton } from '../../../helpers/StyledMUI';
import DialogButtons from '../../layout/dialogs/DialogButtons';

const PostModal = ({
    post,
    setPost,
    setPosts,
    handleClose,
    setExploreDialog,
}) => {
    const createPost = async (e) => {
        e.preventDefault();
        console.log('createPost');
    };

    const clearForm = (e) => {
        e.preventDefault();
        console.log('clearForm');
    };

    return (
        <FormControl
            component='form'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
            }}
            onSubmit={createPost}
        >
            {/* Head */}
            <DialogHead {...{ handleClose, title: 'Create Post' }} />

            {/* Buttons */}
            <DialogButtons {...{ clearForm, resource: 'Post' }} />
        </FormControl>
    );
};

export default PostModal;
