// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interceptorApi from "./interceptorApi";
import setAccessToken from "../utils/setAccessToken";

// Define the async thunk for fetching the API data
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await interceptorApi.get("/users?page=1");
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
});

// Define the async thunk for user login
export const userLogin = createAsyncThunk("login/userLogin", async (value) => {
  try {
    const response = await interceptorApi.post("/login", value);
    const { token } = response.data;
    setAccessToken(token);
    return response.data;
  } catch (error) {
    throw new Error("Error login");
  }
});

// Define the async thunk for deleting a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await interceptorApi.delete(`/users/${id}`);
    console.log("Post deleted:", id);
    return id;
  } catch (error) {
    throw new Error("Error deleting post");
  }
});

// Create the slice
const apiSlice = createSlice({
  name: "api",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
    isAuthenticate: false,
  },
  reducers: {
    updateAuthentication: (state, action) => {
      state.isAuthenticate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions
export const { updateAuthentication } = apiSlice.actions;
// Export the reducer
export const apiReducer = apiSlice.reducer;
