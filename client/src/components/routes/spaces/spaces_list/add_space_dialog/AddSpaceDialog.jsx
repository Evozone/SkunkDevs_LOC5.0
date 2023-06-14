// React
import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../../../features/notify/notifySlice';

// Material-UI Components
import { FormControl, Stack, Divider } from '@mui/material';

// External Packages
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// Custom Components
import ASD_Head from '../../../layout/dialogs/DialogHead';
import DialogButtons from '../../../layout/dialogs/DialogButtons';
import ASD_TextInput from './ASD_TextInput';
import ASD_ImgInput from './ASD_ImgInput';

export default function AddSpaceDialog({
    form,
    setForm,
    setSpaces,
    handleClose,
    setModalVisible,
}) {
    const dispatch = useDispatch();

    const [roomId, setRoomId] = useState('');
    const currentUser = useSelector((state) => state.auth);
    // This useEffect triggers when the component mounts,
    // and creates a new room on 100ms (package) and stores the roomId in state.
    useEffect(() => {
        const getManagementToken = async () => {
            var managementToken = '';
            await fetch(`${import.meta.env.VITE_SERVER_URL}/mtoken`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    managementToken = data.data.token;
                })
                .catch((err) => {
                    alert('Something went wrong, please try again later.');
                });
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${managementToken}`,
                },
                body: JSON.stringify({
                    name: `${currentUser.username}-${uuid()}`,
                    description: 'This is a sample description for the room',
                    template_id: '63b72b6a447a48e7edc226bf',
                    region: 'us',
                }),
            };
            await fetch('https://api.100ms.live/v2/rooms', requestOptions)
                .then((response) => response.json())
                .then((data) => setRoomId(data.id))
                .catch((err) => {
                    alert('Something went wrong, please try again later.');
                });
        };
        getManagementToken();
        return () => {
            setRoomId('');
            setForm((prev) => ({ ...prev, coverImgURL: null }));
        };
    }, []);

    // Function to create a new group
    const createNewGroup = async (e) => {
        e.preventDefault();
        try {
            // Get the current user's auth token from localStorage
            const auth = window.localStorage.getItem('photoApp');
            // Send a POST request to the server to create a new group
            const data = {
                roomId,
                title: form.title,
                description: form.description,
                cover: form.coverImgURL,
            };
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/rooms`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth}`,
                    },
                }
            );

            // If the response is successful, close the modal and reset the form
            setModalVisible(false);
            setForm({ title: '', description: '', coverImgURL: null });
            // Add the new group to the groups state
            setSpaces((prev) => [...prev, response.data.result]);
        } catch (error) {
            console.log(error);
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again, or Try again later 😔'
                )
            );
        }
    };

    // Clear form
    const clearForm = (e) => {
        e.preventDefault();
        setForm({ title: '', description: '', coverImgURL: null });
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
            onSubmit={createNewGroup}
        >
            {/* Head */}
            <ASD_Head {...{ handleClose, title: 'Create a new Space' }} />

            <Stack
                direction='row'
                spacing={2}
                divider={
                    <Divider
                        orientation='vertical'
                        flexItem
                        sx={{ width: '1px', backgroundColor: 'grey.500' }}
                    />
                }
            >
                {/* Left side, title and description */}
                <ASD_TextInput {...{ form, setForm }} />

                {/* Right side, image */}
                <ASD_ImgInput {...{ form, setForm }} />
            </Stack>

            {/* Buttons */}
            <DialogButtons {...{ clearForm, resource: 'Space' }} />
        </FormControl>
    );
}
