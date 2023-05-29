import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSignedIn: false,
    uid: null,
    bio: null,
    socialLinks: null,
    location: null,
    email: null,
    name: null,
    avatar: null,
    username: null,
    mid: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            window.localStorage.setItem(
                'photoApp',
                JSON.stringify({ dnd: action.payload.token, isSignedIn: true })
            );
            state.isSignedIn = true;
            state.uid = action.payload.uid;
            state.bio = action.payload.bio;
            state.socialLinks = action.payload.socialLinks;
            state.location = action.payload.location;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
            state.username = action.payload.email.split('@')[0];
            state.mid = action.payload.mid;
            state.token = action.payload.token;
        },
        signOut: (state) => {
            window.localStorage.removeItem('photoApp');
            state.isSignedIn = false;
            state.uid = null;
            state.bio = null;
            state.socialLinks = null;
            state.location = null;
            state.email = null;
            state.name = null;
            state.avatar = null;
            state.username = null;
            state.mid = null;
            state.token = null;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
