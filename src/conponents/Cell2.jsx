import { useState } from 'react'
import { ReactComponent as Bomb } from '../img/bomb.svg'
import { ReactComponent as BombX } from '../img/bombX.svg'
import { ReactComponent as Flag } from '../img/flag.svg'
import styles from './Cell2.module.css'

function Cell({
  value,
  cellNum,
  mine,
  visible,
  openCell,
  openZeroCell,
  gameOver,
  markCell,
  checkWin,
  marked,
  exploded,
  missMarked,
  notOver,
}) {
  // const [notOver, setNotOver] = useState(true)

  const noContext = (e) => {
    e.preventDefault()
  }

  const btnClick = (e) => {
    // e.preventDefault()
    // true &&
    if (e.button === 0 && !marked && notOver) {
      if (value === 0) {
        openZeroCell(cellNum)
      } else if (value === mine) {
        gameOver(cellNum)
      } else {
        openCell(cellNum)
      }
    } else if (e.button === 2 && notOver) {
      markCell(cellNum)
    }
    // checkWin()
  }

  // console.log(styles.numbers + 10000)

  return (
    <div
      className={styles.cell + ' ' + (notOver && styles.cellHover)}
      onContextMenu={noContext}
      onMouseUp={btnClick}
    >
      {visible && (
        <div className={styles.openCell}>
          {exploded ? (
            <div className={styles.explodedCell}>
              <Bomb className={styles.bomb} />
            </div>
          ) : missMarked ? (
            <BombX className={styles.bomb} />
          ) : value === mine ? (
            <Bomb className={styles.bomb} />
          ) : (
            <h1
              className={
                // let name = styles.numbers + 10000,
                styles.numbers + ' ' + styles['numbers' + value]
              }
            >
              {value}
            </h1>
          )}
        </div>
      )}
      {!visible && <div className={styles.closeCell}></div>}
      {!visible && marked && (
        <div className={styles.cell + ' ' + (notOver && styles.cellHover)}>
          <Flag className={styles.flag} />
        </div>
      )}
    </div>
  )
}

export default Cell
