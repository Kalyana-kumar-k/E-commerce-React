import { createSlice } from "@reduxjs/toolkit";

let wishListData = JSON.parse(localStorage.getItem("cart"));

let cartSlice = createSlice({
  name: "cart",
  initialState: wishListData,
  reducers: {
    addNewItem(state, action) {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify([...state]));
    },
    removeGivenItem(state, action) {
      let newWishList = state.filter(
        (cartProduct) => cartProduct.id !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify([...newWishList]));
      return newWishList;
    },
  },
});

export default cartSlice.reducer;
export let { addNewItem, removeGivenItem } = cartSlice.actions;
