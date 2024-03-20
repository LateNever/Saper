import { useState } from 'react'
import styles from './Leaderboard.module.css'

function Leaderboard({ leaderBoardArr }) {
  return (
    <div>
      <table className={styles.leaderTable}>
        <tr>
          <td className={styles.leaderTd}></td>
          <td className={styles.leaderTd}>Name</td>
          <td className={styles.leaderTd}>Score</td>
        </tr>
        {leaderBoardArr.map((gamer, i) => {
          return (
            <tr>
              <td className={styles.leaderTd}>{i + 1}</td>
              <td className={styles.leaderTd}>{gamer.name}</td>
              <td className={styles.leaderTd}>{gamer.time}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Leaderboard
