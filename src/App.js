import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PageApp from './conponents/PageApp.jsx'
import Leaderboard from './conponents/Leaderboard.jsx'

function App() {
  const [leaderBoardArr, setLeaderBoardArr] = useState([])

  const createLeaderBoardArr = (name, time) => {
    let boardArr = [...leaderBoardArr, { name: name, time: time }].sort(
      (a, b) => {
        if (a.time < b.time) return -1
      }
    )
    if (boardArr.length > 10) boardArr.length = 10
    setLeaderBoardArr(boardArr)
    console.log(leaderBoardArr)
  }

  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Routes>
        <Route
          path="/"
          element={<PageApp createLeaderBoardArr={createLeaderBoardArr} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard leaderBoardArr={leaderBoardArr} />}
        />
      </Routes>
    </div>
  )
}

export default App
