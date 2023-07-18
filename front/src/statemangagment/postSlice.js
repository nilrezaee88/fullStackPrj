import { createSlice } from "@reduxjs/toolkit";

// Create the posts slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    archivePost: [],
  },
  reducers: {
    setData: (state, action) => {
      state.posts = action.payload;
    },
    archiveData: (state, action) => {
      const postId = action.payload;
      const allPost=JSON.parse(JSON.stringify(state)).posts
      const postToArchive = allPost.find((item) => item.id === postId);
      if (postToArchive) {
        return {
          ...state,
          archivePost: [...state.archivePost, postToArchive],
        };
      }
      return state;
    },
  },
});

// Export the reducer and actions
export const { reducer: postReducer, actions: postActions } = postSlice;
export const { setData, archiveData } = postActions;
