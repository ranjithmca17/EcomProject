// shopCart-slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  // other initial states...
};

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = []; // Clear the cart items
    },
    // other reducers...
  },
});

export const { resetCart } = shopCartSlice.actions;

export default shopCartSlice.reducer;
