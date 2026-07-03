import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSliceReducer";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});

export default store;
