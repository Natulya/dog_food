import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUserToken(state, action) {
      console.log(state, action)
    },
  },
})

export const { setUserToken } = userSlice.actions

export const getUserSelector = (state) => state.user

export const userReducer = userSlice.reducer
