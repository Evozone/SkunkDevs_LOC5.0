import { useState } from 'react';
import ExploreSearch from './ExploreSearch';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';

import {
    lMode1,
    lMode2,
    lMode3,
    lMode4,
    lMode5,
    lMode6,
    dMode1,
    dMode2,
    dMode3,
    dMode4,
    dMode5,
    dMode6,
} from '../utils/colors';
import AddPostModal from './AddPostModal';

export default function Explore({ mode, themeChange }) {
    const [modalVisibility, setModalVisibility] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    return (
        <>
            <ExploreSearch mode={mode} />
            <Tooltip title='Create a new Group'>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        color: mode === 'light' ? 'white' : 'black',
                        backgroundColor: mode === 'light' ? lMode4 : dMode4,

                        borderRadius: '50%',
                        height: '3rem',
                        width: '3rem',

                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',

                        boxShadow: '0 0 10px 0 rgba(78,135,140, 0.5)',

                        '&:hover': {
                            backgroundColor: mode === 'light' ? lMode3 : dMode3,
                            color: mode === 'light' ? 'white' : 'black',
                            transform: 'scale(1.1) rotate(90deg)',
                            transition: 'transform 0.2s ease-in-out',
                        },
                    }}
                    onClick={toggleModalVisibility}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <AddPostModal
                toggleModalVisibility={toggleModalVisibility}
                modalVisibility={modalVisibility}
            />
        </>
    );
}
