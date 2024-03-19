import React, { useState } from 'react';

import { notify } from '../../../features/notify/notifySlice';
import { useDispatch } from 'react-redux';

import axios from 'axios';

const AddPostInterface = () => {

    const dispatch = useDispatch();

    const [postForm, setPostForm] = useState({
        imageUrl: 'https://picsum.photos/200/300',
        thumbnailUrl: 'https://picsum.photos/200/300',
        caption: '',        
        tags: {},
        monetizeType: '',
        // parentCollection: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dnd = window.localStorage.getItem('photoApp');

        // Complete the form data
        // ...

        const formData = new FormData();
        formData.append('imageUrl', postForm.imageUrl);
        formData.append('thumbnailUrl', postForm.thumbnailUrl);
        formData.append('caption', postForm.caption);
        formData.append('tags', postForm.tags);
        formData.append('monetizeType', postForm.monetizeType);
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/images`, 
                formData,
                {headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                }}
            );
            dispatch(
                notify({
                    open: true,
                    severity: 'success',
                    message: 'Post created successfully',
                })
            );
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Caption */}
                <label htmlFor="caption">Caption</label>
                <input
                    type="text"
                    id="caption"
                    name="caption"
                    value={postForm.caption}
                    onChange={(e) => setPostForm({ ...postForm, caption: e.target.value })}
                />
                {/* Tags */}
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={postForm.tags}
                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                />
                {/* Monetize Type */}
                <label htmlFor="monetizeType">Monetize Type</label>
                <select
                    id="monetizeType"
                    name="monetizeType"
                    value={postForm.monetizeType}
                    onChange={(e) => setPostForm({ ...postForm, monetizeType: e.target.value })}
                >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                </select>
                <button type="submit">Upload Image</button>
            </form>
        </div>
    );
};
export default AddPostInterface;