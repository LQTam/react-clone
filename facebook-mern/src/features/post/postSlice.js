import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsData: (state, action) => {
      state.posts = action.payload;
    },
    addNewPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    deletePostByGivenId: (state, action) => {
      let { _id } = action.payload;
      state.posts = state.posts.filter((post) => post._id !== _id);
    },
  },
});
export const { setPostsData, addNewPost, deletePostByGivenId } =
  postSlice.actions;
export const selectPostsData = (state) => state.post.posts;
export default postSlice.reducer;
