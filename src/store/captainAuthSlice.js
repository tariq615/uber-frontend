import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  captainData: null
};

const captainAuthSlice = createSlice({
  name: "captainAuth",
  initialState,
  reducers: {
    captainLogin: (state, action) => {
      state.status = true,
      state.captainData = action.payload.captainData
    },
    captainLogout: (state) => {
    state.status = null,
    state.captainData = null
    },
  },
});

export const { captainLogin, captainLogout } = captainAuthSlice.actions;

export default captainAuthSlice.reducer;
