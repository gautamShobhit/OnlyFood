import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import favReducer from "./favSlice.js";
import resListReducer from "./resSlice.js";
import themeReducer from "./themeSlice.js";
import locationReducer from "./locationSlice";

const appStore = configureStore({
  reducer: {
    //   this reducer will contain reducer function of slices
    cart: cartReducer,
    favRest: favReducer,
    resList: resListReducer,
    theme: themeReducer,
    location: locationReducer, // Add the new reducer here
  },
});

export default appStore;
