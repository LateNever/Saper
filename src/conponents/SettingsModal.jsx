import { useState } from 'react'
import Button from './UI/Button'
import { ReactComponent as CloseBtn } from '../img/close.svg'
import styles from './SettingsModal.module.css'

function SettingsModal({ closeModal, changeField }) {
  const [selected, setSelected] = useState('8x8')
  const [manualWidth, setManualWidth] = useState()
  const [manualHeight, setManualHeight] = useState()

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
                    checked={selected === '8x8'}
                    onChange={() => setSelected('8x8')}
                    className={styles.marker}
                  />
                  8x8
                </label>
              </li>
              <li className={styles.modalLi}>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    checked={selected === '16x16'}
                    onChange={() => setSelected('16x16')}
                    className={styles.marker}
                  />
                  16x16
                </label>
              </li>
              <li className={styles.modalLi}>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    checked={selected === '32x16'}
                    onChange={() => setSelected('32x16')}
                    className={styles.marker}
                  />
                  32x16
                </label>
              </li>
              <li className={styles.modalLi}>
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
              </li>
            </ul>
          </div>
          <button className={styles.buttonOk}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
