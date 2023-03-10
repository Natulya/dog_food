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

    selectInCart(state, action) {
      const productInCart = state.find((product) => product.id === action.payload)
      if (productInCart) {
        productInCart.isChecked = !productInCart.isChecked
      }
    },

    selectAllProducts(state) {
      return state.map((product) => ({
        ...product,
        isChecked: true,
      }))
    },

    cancelSelectAllProducts(state) {
      return state.map((product) => ({
        ...product,
        isChecked: false,
      }))
    },

    productIncrement(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count + 1,
          }
        }
        return product
      })
    },

    productDecrement(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count - 1,
          }
        }
        return product
      })
    },

    cartInitialize(state, action) {
      return action.payload
    },

  },
})

export const {
  addToCart, deleteFromCart, clearCart, selectInCart, selectAllProducts, cancelSelectAllProducts,
  productIncrement, productDecrement, cartInitialize,
} = cartSlice.actions

export const getProducstInCartSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer
