import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLeaders } from '../redux/slices/leaderboardSlice'
import styles from './PageApp.module.css'
import Field2 from './Field2'
import Panel from './Panel'
import SettingsModal from './SettingsModal'
import EnterNameModal from './EnterNameModal'

function PageApp() {
  const [modal, setModal] = useState(false)
  const [nameModal, setNameModal] = useState(false)
  const [key, setKey] = useState(100)
  const [size, setSize] = useState([8, 8, 2, 600])
  const [mineAmt, setMineAmt] = useState(size[2])
  const [timer, setTimer] = useState(size[3])
  const [timerInterval, setTimerInterval] = useState(null)
  const [gameState, setGameState] = useState(0)

  const changeMineCounter = (mineQty) => setMineAmt(mineQty)

  const startTimer = (unixTime) => {
    setTimerInterval(
      setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000)
        setTimer(size[3] - (currentTime - unixTime))
      }, 1000)
    )
  }
  const stopTimer = () => {
    clearInterval(timerInterval)
  }

  const changeGameState = (state) => setGameState(state)

  const openNameModal = () => {
    changeGameState(1)
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

  const dispatch = useDispatch()

  const createWinnerList = (name) => {
    dispatch(setLeaders({ name: name, time: timer }))
  }

  const changeField = (size) => {
    setSize(size)
    setKey((oldKey) => oldKey + 1)
    restartField()
  }

  const restartField = (width, height) => {
    setKey((oldKey) => oldKey + 1)
    setMineAmt(size[2])
    stopTimer()
    setTimer(size[3])
    setGameState(0)
  }

  useEffect(() => {
    // Обновляем mineAmt при изменении size
    setMineAmt(size[2])
    setTimer(size[3])
  }, [size])

  return (
    <div className={styles.frame}>
      <Panel
        openModal={openModal}
        restart={restartField}
        mineAmt={mineAmt}
        timer={timer}
        gameState={gameState}
      />
      <Field2
        key={key}
        size={size}
        changeMineCounter={changeMineCounter}
        mineAmt={mineAmt}
        startTimer={startTimer}
        stopTimer={stopTimer}
        openNameModal={openNameModal}
        changeGameState={changeGameState}
      />
      {modal && (
        <SettingsModal
          size={size}
          closeModal={closeModal}
          changeField={changeField}
        />
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
