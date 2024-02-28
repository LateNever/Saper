import { useState } from 'react'
import { ReactComponent as Bomb } from '../img/bomb.svg'
import styles from './Cell2.module.css'

function Cell({
  value,
  cellNum,
  mine,
  visible,
  openCell,
  openZeroCell,
  gameOver,
}) {
  // const [visible, setVisible] = useState(isVisible)
  // console.log(cellNum)
  return (
    <div
      className={styles.cell}
      onClick={
        value === 0
          ? () => {
              // openCell(cellNum)
              openZeroCell(cellNum)
            }
          : value === mine
          ? () => {
              gameOver(cellNum)
            }
          : () => {
              openCell(cellNum)
            }
      }
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
