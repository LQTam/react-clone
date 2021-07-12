import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import conversationReducer from "../features/conversation/conversationSlice";
import usersReducer from "../features/user/usersSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    conversation: conversationReducer,
    post: postReducer,
  },
});
