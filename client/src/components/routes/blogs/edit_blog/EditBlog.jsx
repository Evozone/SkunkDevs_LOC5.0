// React
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

// Material UI - Components (named imports)
import { Box, FormControl, Stack, Divider } from '@mui/material';

// Material UI - Icons (named imports)
import { DriveFileRenameOutline } from '@mui/icons-material';

// External Packages
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Redux
import { notify } from '../../../../features/notify/notifySlice';

// Components
import RouteHeader from '../../layout/RouteHeader';
import RouteContent from '../../layout/RouteContent';
import CB_TextInputs from '../create_blog/CB_TextInputs';
import EB_Actions from './EB_Actions';

function EditBlog() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blog = location.state.blog;

    const [oldForm, setOldForm] = useState({
        title: blog.title,
        content: blog.content,
        summary: blog.summary,
    });

    const [blogForm, setBlogForm] = useState({
        title: blog.title,
        content: blog.content,
        summary: blog.summary,
    });

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

    const editPost = async (e) => {
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
            const response = await axios.patch(
                `${import.meta.env.VITE_SERVER_URL}/api/blogs/${blog._id}`,
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
                    message: 'Blog updated successfully',
                })
            );
            setOldForm(blogForm);
            navigate(`/blog/${response.data.blog._id}`);
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

    const clearChanges = () => {
        setBlogForm(oldForm);
    };

    return (
        <Box className='route-container'>
            <RouteHeader
                title='Edit your blog'
                icon={<DriveFileRenameOutline sx={{ fontSize: 60 }} />}
            />
            <RouteContent>
                <FormControl
                    component='form'
                    sx={{
                        width: '100%',
                        gap: '1rem',
                    }}
                    onSubmit={editPost}
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

                    {/* Buttons */}
                    <EB_Actions {...{ clearChanges, resource: 'Blog' }} />
                </FormControl>
            </RouteContent>
        </Box>
    );
}

export default EditBlog;
