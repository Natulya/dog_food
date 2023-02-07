import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUserToken(state, action) {
      console.log(state, action)
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload
    },

  },
})

export const { setUserToken } = userSlice.actions

export const getUserSelector = (state) => state.user

export const userReducer = userSlice.reducer
