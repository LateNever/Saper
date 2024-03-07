import { useState } from 'react'
import './App.css'
import Field from './conponents/Field'
import Field2 from './conponents/Field2'
import Panel from './conponents/Panel'
import SettingsModal from './conponents/SettingsModal'

function App() {
  const [modal, setModal] = useState(false)
  const [width, setWidth] = useState(8)
  const [height, setHeight] = useState(8)

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const changeField = (width, height) => {
    setWidth(width)
    setHeight(height)
  }

  return (
    <div className="App">
      <div className="frame">
        <Panel openModal={openModal} />
        <Field2 width={width} height={height} mineAmt={5} />
        {modal && (
          <SettingsModal closeModal={closeModal} changeField={changeField} />
        )}
      </div>
    </div>
  )
}

export default App
