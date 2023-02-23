/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUserToken(state, action) {
      console.log(state, action)

      state.token = action.payload
    },

    // setUserInfo(state, action) {
    //   console.log(state, action)
    //   state.name = action.payload.data.name
    //   state.email = action.payload.email
    //   state.id = action.payload['_id']
    // },

    setUserInfo: {
      reducer(state, action) {
        console.log(state, action)
        // state = action.payload
        return {
          ...state,
          ...action.payload,
        }
      },

      prepare(id, name, email) {
        return {
          payload: {
            id,
            name,
            email,
          },
        }
      },
    },

  },
})

export const { setUserToken, setUserInfo } = userSlice.actions

export const getUserSelector = (state) => state.user

export const userReducer = userSlice.reducer
