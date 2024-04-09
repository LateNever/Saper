import { configureStore } from '@reduxjs/toolkit'
import leaderboardSlice from './slices/leaderboardSlice'

export const store = configureStore({ reducer: { leaderboardSlice } })
