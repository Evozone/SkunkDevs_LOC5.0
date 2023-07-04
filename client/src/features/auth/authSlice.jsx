import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSignedIn: false,
    uid: null,
    bio: null,
    socialLinks: null,
    skill_level: null,
    role: null,
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
            state.isSignedIn = true;
            state.uid = action.payload.uid;
            state.bio = action.payload.bio;
            state.socialLinks = action.payload.socialLinks;
            state.skill_level = action.payload.skill_level;
            state.role = action.payload.role;
            state.location = action.payload.location;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
            state.username = action.payload.email.split('@')[0];
            state.mid = action.payload._id;
            state.token = action.payload.token;
            window.localStorage.setItem('photoApp', action.payload.token);
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
        updateCurrentUser: (state, action) => {
            // Only update the fields that are passed in
            for (const [key, value] of Object.entries(action.payload)) {
                // If key is a member of state, update it
                if (key in state) {
                    state[key] = value;
                    continue;
                }
            }
            if (action.payload.token) {
                window.localStorage.setItem('photoApp', action.payload.token);
            }
        },
    },
});

export const { signIn, signOut, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
