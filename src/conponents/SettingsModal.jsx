import { useState } from 'react'
import Button from './UI/Button'
import { ReactComponent as CloseBtn } from '../img/close.svg'
import styles from './SettingsModal.module.css'

function SettingsModal({ closeModal, changeField }) {
  const [manualWidth, setManualWidth] = useState(8)
  const [manualHeight, setManualHeight] = useState(8)
  const [manualMineQty, setManualMineQty] = useState(10)
  const [manualTime, setManualTime] = useState(30)
  const [selected, setSelected] = useState(`${manualWidth}x${manualHeight}`)

  // const change = changeField(manualWidth, manualHeight)
  const change = () => {
    // console.log(manualHeight)
    // console.log(manualHeight)
    closeModal()
    changeField(manualWidth, manualHeight, manualMineQty, manualTime)
  }

  return (
    <div className={styles.modalBack}>
      {/* <img
        className={styles.closeIcon}
        src="../img/close_btn.svg"
        onClick={() => closeModal()}
      /> */}
      <div className={styles.modal}>
        <div className={styles.closeContainer}>
          <CloseBtn className={styles.closeIcon} onClick={closeModal} />
        </div>
        <div className={styles.modalContent}>
          <h1 className={styles.modalH1}>Difficulty</h1>
          <div className={styles.ulContainer}>
            <ul>
              <li className={styles.modalLi}>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    checked={manualWidth === 8 && manualHeight === 8}
                    onChange={() => {
                      setManualWidth(8)
                      setManualHeight(8)
                      setManualMineQty(10)
                      setManualTime(600)
                    }}
                    className={styles.marker}
                  />
                  8x8
                </label>
              </li>
              <li className={styles.modalLi}>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    checked={manualWidth === 16 && manualHeight === 16}
                    onChange={() => {
                      setManualWidth(16)
                      setManualHeight(16)
                      setManualMineQty(40)
                      setManualTime(2400)
                    }}
                    className={styles.marker}
                  />
                  16x16
                </label>
              </li>
              <li className={styles.modalLi}>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    checked={manualWidth === 32 && manualHeight === 16}
                    onChange={() => {
                      setManualWidth(32)
                      setManualHeight(16)
                      setManualMineQty(99)
                      setManualTime(6000)
                    }}
                    className={styles.marker}
                  />
                  32x16
                </label>
              </li>
              {/* <li className={styles.modalLi}>
                <label className={styles.manualLabel}>
                  <input
                    type="radio"
                    checked={selected === 'XxY'}
                    onChange={() => setSelected('XxY')}
                    className={styles.marker}
                  />
                  <input
                    className={styles.manualInput}
                    value={manualWidth}
                    onChange={(e) => setManualWidth(e.target.value)}
                  />
                  <p className={styles.modalX}>x</p>
                  <input
                    className={styles.manualInput}
                    value={manualHeight}
                    onChange={(e) => {
                      const re = /^[0-9]\ \ d * $/
                      if (!re.test(e.target.value)) {
                        console.log('ti che?')
                      } else {
                        setManualHeight(e.target.value)
                      }
                    }}
                  />
                </label>
              </li> */}
            </ul>
          </div>
          <button className={styles.buttonOk} onClick={change}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
