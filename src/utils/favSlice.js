//This slice will store fav restaurants
import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav restaurants",
  initialState: {
    items: [],
  },
  reducers: {
    //These would be actions to be dispatched
    addFavRes: (state, action) => {
      const exists = state.items.find(
        (item) => item.info.id === action.payload.info.id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
  },
});
export const { addFavRes } = favSlice.actions;
export default favSlice.reducer;
