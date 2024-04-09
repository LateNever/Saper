import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PageApp from './conponents/PageApp.jsx'
import Leaderboard from './conponents/Leaderboard.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageApp />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  )
}

export default App
