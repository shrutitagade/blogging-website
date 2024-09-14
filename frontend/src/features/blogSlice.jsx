import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const response = await axios.get('https://blogging-website-51rh.onrender.com/api/blogs/');
    return response.data;
});

export const fetchMyBlogs = createAsyncThunk('blogs/fetchMyBlogs', async (userId) => {
    const response = await axios.get(`https://blogging-website-51rh.onrender.com/api/blogs/myblogs?userId=${userId}`);
    return response.data;
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData) => {
    try {
        const response = await axios.post('https://blogging-website-51rh.onrender.com/api/blogs/create-blog', blogData);
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        //});
        return response.data;
    } catch (error) {
        // Handle error properly, e.g., return an error message or log the error
        throw error.response?.data || 'An error occurred while creating the blog.';
    }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId) => {
    const response = await axios.delete(`https://blogging-website-51rh.onrender.com/api/blogs/${blogId}`);
    return response.data;
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, title, description }) => {
    const { data } = await axios.patch(`https://blogging-website-51rh.onrender.com/api/blogs/${id}/update`, { title, description });
    return data;
});

// Increment likes
export const incrementLikes = createAsyncThunk('blogs/incrementLikes', async (id) => {
    const response = await axios.patch(`https://blogging-website-51rh.onrender.com/api/blogs/${id}/likes`);
    return { id, likes: response.data.likes };
});

// Add a comment
export const addComment = createAsyncThunk('blogs/addComment', async ({ id, user, text }) => {
    const response = await axios.post(`https://blogging-website-51rh.onrender.com/api/blogs/${id}/comments`, { user, text });
    return { id, comments: response.data };
});

export const incrementViews = createAsyncThunk('blogs/incrementViews', async (id) => {
    const response = await axios.patch(`https://blogging-website-51rh.onrender.com/api/blogs/${id}/views`);
    return { id, views: response.data.views };
});

// Other actions...

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true; // Indicate success
                state.blogs.push(action.payload.blog); // Update state with the new blog
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const updatedBlog = action.payload;
                const existingBlogIndex = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
                if (existingBlogIndex !== -1) {
                    state.blogs[existingBlogIndex] = updatedBlog;
                }
            });
    },
});

export default blogSlice.reducer;
