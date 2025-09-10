import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.card.info.id !== action.payload.card.info.id
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
//export all the actions
export const { addItem, clearCart, removeItem } = cartSlice.actions;
//export reducers
export default cartSlice.reducer;
