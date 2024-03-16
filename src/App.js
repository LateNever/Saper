import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PageApp from './conponents/PageApp.jsx'
import Leaderboard from './conponents/Leaderboard.jsx'

function App() {
  // const [modal, setModal] = useState(false)
  // const [key, setKey] = useState(100)
  // // const [width, setWidth] = useState(8)
  // // const [height, setHeight] = useState(8)
  // const [size, setSize] = useState([8, 8])

  // const openModal = () => {
  //   setModal(true)
  // }

  // const closeModal = () => {
  //   setModal(false)
  // }

  // const changeField = (width, height) => {
  //   // setWidth(width)
  //   // setHeight(height)
  //   setSize([width, height])
  //   setKey((oldKey) => oldKey + 1)
  // }

  // const restartField = (width, height) => {
  //   // setWidth(width)
  //   // setHeight(height)
  //   // setSize([width, height])
  //   setKey((oldKey) => oldKey + 1)
  // }

  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<PageApp />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      {/* <Link to="/f">Home</Link>
      <div className="frame">
        <Panel openModal={openModal} restart={restartField} />
        <Field2 key={key} size={size} mineAmt={5} />
        {modal && (
          <SettingsModal closeModal={closeModal} changeField={changeField} />
        )}
      </div>
      <Routes>
        <Route
          path="/f"
          element={<Field2 key={key} size={size} mineAmt={5} />}
        />
      </Routes> */}
    </div>
  )
}

export default App
