import { configureStore } from '@reduxjs/toolkit'
import leaderboardSlice from './slices/leaderboardSlice'
import fieldSlice from './slices/fieldSlice'

export const store = configureStore({
  reducer: { leaderboardSlice, fieldSlice },
})
