import { useState } from 'react'
import { ReactComponent as Bomb } from '../img/bomb.svg'
import styles from './Cell.module.css'

function Cell({ value, mine }) {
  const [visible, setVisible] = useState(false)
  return (
    <div
      className={styles.cell}
      onClick={() => {
        setVisible(true)
      }}
    >
      {visible && (
        <div className={styles.openCell}>
          {value == mine ? (
            <Bomb className={styles.bomb} />
          ) : (
            <h1 className={styles.numbers}>{value}</h1>
          )}
        </div>
      )}
      {!visible && <div className={styles.closeCell}></div>}
    </div>
  )
}

export default Cell
