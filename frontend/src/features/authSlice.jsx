import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
    const response = await axios.post('https://blogging-website-51rh.onrender.com/api/auth/login', userData);
    return response.data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
    const response = await axios.post('https://blogging-website-51rh.onrender.com/api/auth/register', userData);
    return response.data;
});
export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const response = await axios.get('https://blogging-website-51rh.onrender.com/api/auth/users');
    return response.data;
});
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
