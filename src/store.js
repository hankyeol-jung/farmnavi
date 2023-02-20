import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "userInfo",
  initialState: "",
  reducers: {
    userChange(state, a) {
      return a.payload;
    },
  },
});

export let { userChange } = user.actions;

export default configureStore({
  reducer: {
    userInfo: user.reducer,
  },
});
