import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "userInfo",
  initialState: { name: "", farm: "" },
  reducers: {
    userName(state, a) {
      state.name = a.payload;
    },
    userFarm(state, a) {
      state.farm = a.payload;
    },
  },
});

export let { userName } = user.actions;
export let { userFarm } = user.actions;

export default configureStore({
  reducer: {
    userInfo: user.reducer,
  },
});
