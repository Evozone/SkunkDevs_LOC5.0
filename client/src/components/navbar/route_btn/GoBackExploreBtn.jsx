// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { Button } from '@mui/material';

// Material UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBackExploreBtn() {
    const navigate = useNavigate();
    const lastPage = localStorage.getItem('photoAppLastPage');

    return (
        <Button
            variant='outlined'
            onClick={() => navigate('/' + lastPage)}
            startIcon={<ArrowBackIcon />}
            sx={{
                color: 'white',
                borderColor: 'grey.500',
                borderRadius: '50px',
                borderWidth: '2px',
                height: '35px',
                '&:hover': {
                    borderColor: 'white',
                    borderWidth: '2px',
                },
            }}
        >
            Go Back to {lastPage ? lastPage : 'Explore'}
        </Button>
    );
}
