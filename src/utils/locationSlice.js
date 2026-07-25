// locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    lat: null,
    lng: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
