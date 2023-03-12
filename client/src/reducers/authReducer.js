import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
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

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            window.localStorage.setItem(
                'photoApp',
                JSON.stringify({ dnd: action.payload.token, isSignedIn: true })
            );
            return {
                ...state,
                isSignedIn: true,
                uid: action.payload.uid,
                bio: action.payload.bio,
                socialLinks: action.payload.socialLinks,
                location: action.payload.location,
                email: action.payload.email,
                name: action.payload.name,
                avatar: action.payload.avatar,
                username: action.payload.email.split('@')[0],
                mid: action.payload.mid,
                token: action.payload.token,
            };

        case SIGN_OUT:
            window.localStorage.removeItem('photoApp');
            return {
                ...state,
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

        default:
            return state;
    }
};

export default authReducer;
