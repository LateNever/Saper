import { useState } from 'react'
import styles from './PageApp.module.css'
import Field2 from './Field2'
import Panel from './Panel'
import SettingsModal from './SettingsModal'

function PageApp() {
  const [modal, setModal] = useState(false)
  const [key, setKey] = useState(100)
  // const [width, setWidth] = useState(8)
  // const [height, setHeight] = useState(8)
  const [size, setSize] = useState([8, 8, 1, 30000])
  const [mineAmt, setMineAmt] = useState(size[2])
  const [timer, setTimer] = useState(size[3])

  const changeMineCounter = (mineQty) => setMineAmt(mineQty)

  const changeTimer = (timerValue) => setTimer(timerValue)

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const changeField = (width, height, mineQty) => {
    setSize([width, height, mineQty])
    setKey((oldKey) => oldKey + 1)
    setMineAmt(size[2])
  }

  const restartField = (width, height) => {
    setKey((oldKey) => oldKey + 1)
    setMineAmt(size[2])
  }

  return (
    <div className={styles.frame}>
      <Panel
        openModal={openModal}
        restart={restartField}
        mineAmt={mineAmt}
        timer={timer}
      />
      <Field2
        key={key}
        size={size}
        changeMineCounter={changeMineCounter}
        mineAmt={mineAmt}
      />
      {modal && (
        <SettingsModal closeModal={closeModal} changeField={changeField} />
      )}
    </div>
  )
}

export default PageApp
