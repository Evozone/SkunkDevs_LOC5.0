// React
import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material-UI Components
import { Dialog } from '@mui/material';

// Material-UI Icons
import AddIcon from '@mui/icons-material/Add';

// Components
import DynamicFab from '../../layout/DynamicFab';
import AddSpaceDialog from './add_space_dialog/AddSpaceDialog';

export default function AddSpace({ spaces, setSpaces }) {
    // To check if user is signed in
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        coverImgURL: null,
    });

    const handleClose = () => {
        setForm({ title: '', description: '', coverImgURL: null });
        setModalVisible(false);
    };

    return (
        <>
            <Dialog
                open={modalVisible}
                onClose={handleClose}
                fullWidth
                maxWidth='md'
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 5,
                    },
                }}
            >
                <AddSpaceDialog
                    {...{
                        form,
                        setForm,
                        setSpaces,
                        handleClose,
                        setModalVisible,
                    }}
                />
            </Dialog>
            {isSignedIn && (
                <DynamicFab
                    onClick={() => setModalVisible(true)}
                    icon={<AddIcon />}
                    label='add new space'
                />
            )}
        </>
    );
}
