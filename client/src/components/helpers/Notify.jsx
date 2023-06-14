// React
import React from 'react';

// Material UI
import { Alert, Snackbar, Slide } from '@mui/material';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../features/notify/notifySlice';

export default function Notify() {
    const dispatch = useDispatch();
    const notifyState = useSelector((state) => state.notify);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(notify({ open: false }));
    };

    return (
        <>
            {notifyState.open && (
                <Snackbar
                    open={notifyState.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    sx={{ bottom: '20px' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    TransitionComponent={(props) => (
                        <Slide {...props} direction='left' />
                    )}
                >
                    <Alert
                        onClose={handleClose}
                        severity={notifyState.severity}
                        sx={{ width: '100%' }}
                        elevation={6}
                    >
                        {notifyState.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
