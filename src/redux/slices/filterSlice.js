import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    changeSearchFilter(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.search = action.payload
    },
  },
})

export const { changeSearchFilter } = filterSlice.actions

export const getSearchSelector = (state) => state.filter.search

export const filterReducer = filterSlice.reducer
