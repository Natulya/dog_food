import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: initState.favourites,
  reducers: {
    addInFavourites(state, action) {
      state.push(action.payload)
    },

    deleteFromFavourites(state, action) {
      return state.filter((id) => id !== action.payload)
    },
    clearFavourites() {
      return []
    },

  },
})

export const { addInFavourites, deleteFromFavourites, clearFavourites } = favouriteSlice.actions
export const getAllFavouriteProductsSelector = (state) => state.favourites
export const favouriteReducer = favouriteSlice.reducer
