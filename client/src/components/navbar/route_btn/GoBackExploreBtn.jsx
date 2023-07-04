// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import { Button } from '@mui/material';

// Material UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBackExploreBtn() {
    const navigate = useNavigate();
    const lastPage = localStorage.getItem('photoAppLastPage') || '';

    const [btnTextColor, setBtnTextColor] = useState('white');

    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 0) {
                setBtnTextColor('default');
            } else {
                setBtnTextColor('white');
            }
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <Button
            variant='outlined'
            onClick={() => navigate('/' + lastPage)}
            startIcon={<ArrowBackIcon />}
            sx={{
                color: btnTextColor,
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
