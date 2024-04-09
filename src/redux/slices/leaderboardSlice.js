import { createSlice } from '@reduxjs/toolkit'

const initialState = new Array(10).fill({
  name: '',
  time: '',
})

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaders(state, action) {
      let boardArr = [...state, action.payload].sort((a, b) => {
        if (a.time > b.time) return -1
      })
      if (boardArr.length > 10) boardArr.length = 10
      return boardArr
    },
  },
})

export const { setLeaders } = leaderboardSlice.actions

export default leaderboardSlice.reducer
