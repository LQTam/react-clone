import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      const { email, displayName, photoURL, uid } = action.payload;
      state.email = email;
      state.displayName = displayName;
      state.photoURL = photoURL;
      state.uid = uid;
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
export const selectUserUID = (state) => state.user.uid;

export default userSlice.reducer;
