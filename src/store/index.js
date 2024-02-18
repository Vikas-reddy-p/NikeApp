import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { cartSlice } from "./cartSlice";
import { masterProductsSlice } from "./masterProductsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    masterProducts: masterProductsSlice.reducer,
  },
});
