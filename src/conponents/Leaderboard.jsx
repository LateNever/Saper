import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Leaderboard.module.css'
import { useSelector } from 'react-redux'

function Leaderboard() {
  const leaderBoardArrNew = useSelector((state) => state.leaderboardSlice)

  return (
    <div className={styles.leaderContainer}>
      <h1>Leaderboards</h1>
      <table className={styles.leaderTable}>
        <thead className={styles.leaderHead}>
          <tr>
            <td className={styles.leaderTdOne}></td>
            <td className={styles.leaderTd}>Name</td>
            <td className={styles.leaderTd}>Score</td>
          </tr>
        </thead>
        <tbody>
          {leaderBoardArrNew.map((gamer, i) => {
            return (
              <tr key={i} className={styles.leaderTr}>
                <td className={styles.leaderTdOne}>{i + 1}</td>
                <td className={styles.leaderTd}>{gamer.name}</td>
                <td className={styles.leaderTd}>{gamer.time}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link className={styles.linkButton} to="/">
        <button className={styles.buttonOk}>Back</button>
      </Link>
    </div>
  )
}

export default Leaderboard
