import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 'free',
};

const exploreSlice = createSlice({
    name: 'explore',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            state.category = action.payload.category;
        },
    },
});

export const { changeFilter } = exploreSlice.actions;
export default exploreSlice.reducer;
