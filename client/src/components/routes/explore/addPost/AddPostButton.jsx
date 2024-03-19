// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI Icons
import AddIcon from '@mui/icons-material/Add';

// Components
import DynamicFab from '../../layout/DynamicFab';

import AddPostInterface from '../../newpost/AddPostInterface.jsx'; // Import the AddPostInterface component

export default function AddPostButton() {
    const navigate = useNavigate();

    const handleAddPostClick = () => {
        navigate('/addPost');
    };

    return (
        <DynamicFab
            onClick={handleAddPostClick}
            icon={<AddIcon />}
            label='Add New Post'
        /> 
    );
} 