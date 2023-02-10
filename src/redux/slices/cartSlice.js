import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload.id)
        if (!currentProduct) state.unshift(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            isChecked: true,
            count: 1,
          },
        }
      },
    },

    deleteFromCart(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },

    clearCart() {
      return []
    },

  },
})

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions

export const getProducstInCartSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer
