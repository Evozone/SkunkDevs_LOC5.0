import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: false,
    uid: null,
    email: null,
    name: null,
    photoURL: null,
    token: null,
    signInTime: null,
    username: null,
    mid: null
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
                email: action.payload.email,
                name: action.payload.name,
                photoURL: action.payload.photoURL,
                token: action.payload.token,
                signInTime: action.payload.signInTime,
                username: action.payload.email.split('@')[0],
                mid: action.payload.mid
            };

        case SIGN_OUT:
            window.localStorage.removeItem('photoApp');
            return {
                ...state,
                isSignedIn: false,
                uid: null,
                email: null,
                name: null,
                photoURL: null,
                token: null,
                signInTime: null,
                username: null,
            };

        default:
            return state;
    }
};

export default authReducer;
