import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  conversations: [],
  chats: [],
  open: false,
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addToChat: (state, action) => {
      state.chats = action.payload;
    },
    addNewConversation: (state, action) => {
      state.conversations = [...state.conversations, action.payload];
    },
    setOpenConversation: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setConversations, setOpenConversation, addNewConversation } =
  conversationSlice.actions;

export const selectConversations = (state) => state.conversation.conversations;
export const selectConversation = (state, uid) => {
  const { conversations } = state.conversation;
  const index = conversations.findIndex((item) => item.members.includes(uid));
  let conversation = null;
  if (index > -1) conversation = conversations[index];
  return conversation;
};
export const isOpenConversation = (state) => state.conversation.open;

export default conversationSlice.reducer;
