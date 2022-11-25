import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'searchPoke',
    initialState: false,
    reducers: {
        setSearchPoke: (state , action) => {
            return action.payload
        }
    }
})

export const { setSearchPoke } = searchSlice.actions;

export default searchSlice.reducer;
