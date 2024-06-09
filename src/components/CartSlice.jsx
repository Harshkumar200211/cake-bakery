import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      state.cartItems[itemIndex].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      }
    }
  }
});

// Export actions and reducer
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
