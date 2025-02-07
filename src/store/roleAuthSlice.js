import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  role: null
};

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        roleAuth: (state, action)=>{
            state.status = true,
            state.role = action.payload
        },
        roleUnAuth: (state)=>{
            state.status = false,
            state.role = null
        }
    }
})

export const {roleAuth, roleUnAuth} = roleSlice.actions;

export default roleSlice.reducer