import { createSlice } from "@reduxjs/toolkit";

const resSlice = createSlice({
  name: "resList",
  initialState: [],
  reducers: {
    addResItems: (state, action) => {
      return action.payload;
    },
  },
});
export const { addResItems } = resSlice.actions;
export default resSlice.reducer;
