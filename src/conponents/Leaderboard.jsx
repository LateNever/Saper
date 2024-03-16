import { useState } from 'react'
import styles from './Leaderboard.module.css'

function Leaderboard() {
  const [leaders, setLeaders] = useState(
    new Array(10).fill({
      no: 0,
      name: 'none',
      score: 'none',
    })
  )

  return (
    <div>
      <table className={styles.leaderTable}>
        <tr>
          <td className={styles.leaderTd}></td>
          <td className={styles.leaderTd}>Name</td>
          <td className={styles.leaderTd}>Score</td>
        </tr>
        {leaders.map((gamer, i) => {
          return (
            <tr>
              <td className={styles.leaderTd}>{i + 1}</td>
              <td className={styles.leaderTd}>{gamer.name}</td>
              <td className={styles.leaderTd}>{gamer.score}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Leaderboard
