import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    severity: 'info',
    message: '',
};

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        notify: (state, action) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
    },
});

export const { notify } = notifySlice.actions;
export default notifySlice.reducer;
