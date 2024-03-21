import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import notifyReducer from '../features/notify/notifySlice';
import loadingReducer from '../features/loading/loadingSlice';
import exploreReducer from '../features/explore/exploreSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        notify: notifyReducer,
        loading: loadingReducer,
        explore: exploreReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

    devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
