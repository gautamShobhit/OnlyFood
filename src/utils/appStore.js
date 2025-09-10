import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import favReducer from "./favSlice.js";
import resListReducer from "./resSlice.js";
import themeReducer from "./themeSlice.js";

const appStore = configureStore({
  reducer: {
    //   this reducer will contain reducer function of slices
    cart: cartReducer,
    favRest: favReducer,
    resList: resListReducer,
    theme: themeReducer,
  },
});

export default appStore;
