import { useState } from 'react'
import styles from './PageApp.module.css'
import Field2 from './Field2'
import Panel from './Panel'
import SettingsModal from './SettingsModal'
import EnterNameModal from './EnterNameModal'

function PageApp({ createLeaderBoardArr }) {
  const [modal, setModal] = useState(false)
  const [nameModal, setNameModal] = useState(false)
  const [key, setKey] = useState(100)
  // const [width, setWidth] = useState(8)
  // const [height, setHeight] = useState(8)
  const [size, setSize] = useState([8, 8, 9, 600])
  const [mineAmt, setMineAmt] = useState(size[2])
  const [timer, setTimer] = useState(size[3])
  const [timerInterval, setTimerInterval] = useState(null)
  // const [winnerList, setWinnerList] = useState([])

  const changeMineCounter = (mineQty) => setMineAmt(mineQty)

  // const changeTimer = (timerValue) => setTimer(timerValue)
  const startTimer = (unixTime) => {
    setTimerInterval(
      setInterval(() => {
        const currentDate = new Date()
        const currentTime = Math.floor(currentDate.getTime() / 1000)
        setTimer(size[3] - (currentTime - unixTime))
      }, 1000)
    )
    // console.log(timerInterval)
  }
  // const stopTimer = () => window.clearInterval(timerInterval)
  const stopTimer = () => {
    clearInterval(timerInterval)
    // setNameModal(true)
  }

  const openNameModal = () => {
    setNameModal(true)
  }

  const closeNameModal = () => {
    setNameModal(false)
  }

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const createWinnerList = (name) => {
    createLeaderBoardArr(name, size[3] - timer)
    // console.log(winnerList)
    // createLeaderBoardArr()
  }

  const changeField = (width, height, mineQty, time) => {
    setSize([width, height, mineQty, time])
    setKey((oldKey) => oldKey + 1)
    setMineAmt(size[2])
    restartField()
  }

  const restartField = (width, height) => {
    setKey((oldKey) => oldKey + 1)
    setMineAmt(size[2])
    stopTimer()
    setTimer(size[3])
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
        startTimer={startTimer}
        stopTimer={stopTimer}
        openNameModal={openNameModal}
      />
      {modal && (
        <SettingsModal closeModal={closeModal} changeField={changeField} />
      )}
      {nameModal && (
        <EnterNameModal
          closeNameModal={closeNameModal}
          createWinnerList={createWinnerList}
        />
      )}
    </div>
  )
}

export default PageApp
