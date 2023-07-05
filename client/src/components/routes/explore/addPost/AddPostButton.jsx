// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI Icons
import AddIcon from '@mui/icons-material/Add';

// Components
import DynamicFab from '../../layout/DynamicFab';

export default function AddPost() {
    const navigate = useNavigate();
    return (
        <DynamicFab
            onClick={() => navigate('/addPost')}
            icon={<AddIcon />}
            label='add new post'
        />
    );
}
