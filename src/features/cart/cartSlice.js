import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // go to the store
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      //payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      //If Qty = 0, call the one of those reducers in the list...
      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});
console.log(cartSlice);

//
export const {
  addItem,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
//first cart = slice's name
//second cart = array in the slice
export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((sum, curItem) => sum + curItem.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, curItem) => sum + curItem.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
