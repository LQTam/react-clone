import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      const { email, displayName, photoURL } = action.payload;
      state.email = email;
      state.displayName = displayName;
      state.photoURL = photoURL;
    },
    setSignOut: (state) => {
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
    },
  },
});

export const { setUserLogin, setSignOut } = userSlice.actions;

export const selectUserName = (state) => state.user.displayName;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photoURL;

export default userSlice.reducer;
