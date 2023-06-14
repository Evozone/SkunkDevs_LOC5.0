// React
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

// Material UI - Components (named imports)
import { Box, Paper, Button, Typography, TextField } from '@mui/material';

// Material UI - Icons (named imports)
import { DriveFileRenameOutline } from '@mui/icons-material';

// External Packages
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Redux
import { notify } from '../../../features/notify/notifySlice';

// Components
import RouteHeader from '../layout/RouteHeader';
import RouteContent from '../layout/RouteContent';

function EditBlog() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blog = location.state.blog;

    const oldTitle = blog.title;
    const oldContent = blog.content;
    const oldSummary = blog.summary;
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [summary, setSummary] = useState(blog.summary);

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
        if (!title || !content || !summary) {
            alert('Please fill all the text fields');
            return;
        }
        if (
            title === oldTitle &&
            content === oldContent &&
            summary === oldSummary
        ) {
            alert('No changes made');
            return;
        }
        const auth = window.localStorage.getItem('photoApp');
        const { dnd } = JSON.parse(auth);
        const data = {
            title,
            content,
            summary,
        };
        try {
            await axios({
                method: 'PATCH',
                url: `${import.meta.env.VITE_SERVER_URL}/api/blog/edit/${
                    blog._id
                }`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            navigate(`/blog/${blog._id}`);
            dispatch(notify(true, 'success', 'Blog edited successfully!'));
        } catch (error) {
            console.log(error);
            dispatch(
                notify(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. later :('
                )
            );
        }
    };

    return (
        <Box className='route-container'>
            <RouteHeader
                title='Edit your blog'
                icon={<DriveFileRenameOutline sx={{ fontSize: 60 }} />}
            />
            <Paper
                sx={{
                    p: 2,
                    mt: 2,
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
                    borderRadius: '15px',
                }}
            >
                <form onSubmit={editPost}>
                    <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label='Title'
                        value={title}
                        color='success'
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label='Summary (max 55 characters)'
                        value={summary}
                        color='success'
                        onChange={(e) => setSummary(e.target.value)}
                        sx={{
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    <ReactQuill
                        theme='snow'
                        modules={modules}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                        sx={{
                            borderRadius: '6px',
                            mb: 3,
                            '& .ql-editor': {
                                p: 1,
                            },
                            '& .ql-container': {
                                p: 1,
                            },
                        }}
                    />

                    <Button
                        color='success'
                        sx={{
                            mt: 3,
                            font: '500 0.9rem Poppins, sans-serif',
                            ':hover': {
                                color: 'black',
                            },
                        }}
                        variant='contained'
                        type='submit'
                    >
                        Save Changes
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default EditBlog;
