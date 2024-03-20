import { useState } from 'react'
import styles from './EnterNameModal.module.css'
import { ReactComponent as CloseBtn } from '../img/close.svg'

function EnterNameModal({ closeNameModal, createWinnerList }) {
  const [name, setName] = useState('')

  const changeName = (ev) => {
    setName(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    // console.log(name)
    createWinnerList(name)
    closeNameModal()
  }

  return (
    <div className={styles.modalBack}>
      <div className={styles.modal}>
        <div className={styles.closeContainer}>
          <CloseBtn className={styles.closeIcon} onClick={closeNameModal} />
        </div>
        <form onSubmit={handleSubmit} className={styles.modalContent}>
          <h1 className={styles.modalH1}>Enter your name</h1>
          <input
            className={styles.modalNameInput}
            type="text"
            value={name}
            onChange={changeName}
          />
          <button type="submit" className={styles.buttonOk}>
            OK
          </button>
        </form>
      </div>
    </div>
  )
}

export default EnterNameModal
