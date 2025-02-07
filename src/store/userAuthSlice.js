import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null
  // token: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.status = true,
      state.userData = action.payload.userData
      // state.token = action.payload.token;
    },
    userLogout: (state) => {
    state.status = null,
    state.userData = null
    // state.token = null;
    },
  },
});

export const { userLogin, userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
