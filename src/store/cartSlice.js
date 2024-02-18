import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newItem = action.payload.product;
      const cartItem = state.items.find(
        (item) =>
          item.product.id === newItem.id && item.product.size === newItem.size
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ product: newItem, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount, size } = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === productId && item.product.size === size
      );
      if (cartItem) {
        cartItem.quantity += amount;
      }
      if (cartItem.quantity <= 0) {
        state.items = state.items.filter((item) => item !== cartItem);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
//custom selectors - used to derive data from the data stored in the state.
//export const selectNumberOfItems = (state) => state.cart.items.length;
export const selectNumberOfItems = (state) =>
  state.cart.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

export const selectSubTotal = (state) =>
  state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

export const selectSelf = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  selectSelf,
  selectSubTotal,
  (state, subtotal) =>
    subtotal > state.freeDeliveryFrom ? 0 : state.deliveryFee
);

export const selectTotal = createSelector(
  selectSubTotal,
  selectDeliveryPrice,
  (subtotal, delivery) => subtotal + delivery
);
