import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchMainPageContentAPI } from "@feature/index";
import { MainContent } from './model';

type MainPageState = {
    content: MainContent[];
    error: unknown | string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MainPageState = {
    content: [],
    error: null,
    status: 'idle',
};

export const fetchMainPageContent = createAsyncThunk(
    'mainPage/fetchContent',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchMainPageContentAPI();
            if (!response) {
                throw new Error('Network error');
            }

            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unkwnown error');
        }
    }
);

const mainPageSlice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMainPageContent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMainPageContent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.content = action.payload;
            })
            .addCase(fetchMainPageContent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default mainPageSlice.reducer;