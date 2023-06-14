// React
import React, { useState } from 'react';

// Material-UI Components
import { Dialog } from '@mui/material';

// Material-UI Icons
import AddIcon from '@mui/icons-material/Add';

// Components
import DynamicFab from '../../layout/DynamicFab';
import AddPostDialog from './AddPostDialog';

export default function AddPost({ posts, setPosts }) {
    const [exploreDialog, setExploreDialog] = useState(false);
    const [post, setPost] = useState({
        description: '',
        type: '',
        tags: [],
    });

    const handleClose = () => {
        setPost({ description: '', type: '', tags: [] });
        setExploreDialog(false);
    };

    return (
        <>
            <Dialog
                open={exploreDialog}
                onClose={handleClose}
                fullWidth
                maxWidth='md'
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 5,
                    },
                }}
            >
                <AddPostDialog
                    {...{
                        post,
                        setPost,
                        setPosts,
                        handleClose,
                        setExploreDialog,
                    }}
                />
            </Dialog>
            <DynamicFab
                onClick={() => setExploreDialog(true)}
                icon={<AddIcon />}
                label='add new post'
            />
        </>
    );
}
