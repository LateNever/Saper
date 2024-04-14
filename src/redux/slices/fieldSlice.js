import { createSlice } from '@reduxjs/toolkit'

const initialState = new Array(16).fill({
  value: 0,
  visible: false,
  isCheked: false,
  marked: false,
  exploded: false,
  missMarked: false,
})

const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    setField(state, action) {
      return action.payload
    },
  },
})

export const { setField } = fieldSlice.actions

export default fieldSlice.reducer
