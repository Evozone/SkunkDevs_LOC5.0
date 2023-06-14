// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { notify } from '../../../../features/notify/notifySlice';

// Material UI - Components (named imports)
import { Box, Divider, FormControl, Stack } from '@mui/material';

// Material UI - Icons (named imports)
import { PostAdd } from '@mui/icons-material';

// External Packages
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Components
import RouteHeader from '../../layout/RouteHeader';
import RouteContent from '../../layout/RouteContent';
import CB_TextInputs from './CB_TextInputs';
import CB_ImgInputs from './CB_ImgInputs';
import DialogButtons from '../../layout/dialogs/DialogButtons';

function CreateBlog() {
    // Navigator and Dispatcher
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // For acitvating the submit button, and showing the upload status of the cover image
    const [buttonStatus, setButtonStatus] = useState(false);

    // The data about the blog
    const [blogForm, setBlogForm] = useState({
        title: '',
        content: '',
        summary: '',
        coverUrl: '',
    });

    // React Quill parameters in a module
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const createNewPost = async (e) => {
        e.preventDefault();

        // Validating the form
        if (blogForm.content.length < 100) {
            alert('Content should be more than 100 characters');
            return;
        }
        if (blogForm.summary.length > 55) {
            alert('Summary should be less than 55 characters');
            return;
        }

        const dnd = window.localStorage.getItem('photoApp');
        const data = {
            title: blogForm.title,
            content: blogForm.content,
            summary: blogForm.summary,
            cover: blogForm.coverUrl,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/blogs`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${dnd}`,
                    },
                }
            );
            dispatch(
                notify({
                    open: true,
                    severity: 'success',
                    message: 'Blog created successfully',
                })
            );
            navigate(`/blog/${response.data.result._id}`);
        } catch (error) {
            console.log(error);
            dispatch(
                notify({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong, please try again later',
                })
            );
        }
    };

    const clearForm = () => {
        setBlogForm({
            title: '',
            content: '',
            summary: '',
            coverUrl: '',
        });
    };

    return (
        <Box className='route-container'>
            <RouteHeader
                title='Write a new blog'
                icon={<PostAdd sx={{ fontSize: 60 }} />}
            />
            <RouteContent>
                <FormControl
                    component='form'
                    sx={{
                        width: '100%',
                        gap: '1rem',
                    }}
                    onSubmit={createNewPost}
                >
                    {/* Top part */}
                    <Stack
                        direction='row'
                        spacing={2}
                        divider={
                            <Divider
                                orientation='vertical'
                                flexItem
                                sx={{
                                    width: '1px',
                                    backgroundColor: 'grey.500',
                                }}
                            />
                        }
                    >
                        {/* Title and SUmmary */}
                        <CB_TextInputs {...{ blogForm, setBlogForm }} />
                        {/* Cover Image */}
                        <CB_ImgInputs
                            {...{ blogForm, setBlogForm, setButtonStatus }}
                        />
                    </Stack>

                    {/* Blog Area */}
                    <ReactQuill
                        theme='snow'
                        modules={modules}
                        value={blogForm.content}
                        onChange={(e) => {
                            setBlogForm((prev) => ({
                                ...prev,
                                content: e,
                            }));
                        }}
                    />

                    <DialogButtons
                        {...{ clearForm, buttonStatus, resource: 'Blog' }}
                    />
                </FormControl>
            </RouteContent>
        </Box>
    );
}

export default CreateBlog;
