import { configureStore } from '@reduxjs/toolkit'
import { DOG_FOOD_CART_KEY } from './constants'
import { getInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { favouriteReducer } from './slices/favouriteSlice'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
    favourites: favouriteReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(DOG_FOOD_CART_KEY, JSON.stringify(store.getState()))
})

// store.subscribe(() => {
//   const cartsFromLS = window.localStorage.getItem(DOG_FOOD_CART_KEY)
//   const currentState = store.getState()

//   const parsedCartsFromLS = cartsFromLS ? JSON.parse(cartsFromLS) : {}

//   if (currentState.user.id) {
//     window.localStorage.setItem(DOG_FOOD_CART_KEY, JSON.stringify({
//       ...parsedCartsFromLS,
//       [currentState.user.id]: currentState.cart,
//     }))
//   }
// })
