import { useState } from 'react'

import Cell from './Cell'

import styles from './Field.module.css'

function Field({ size }) {
  const field = new Array(size * size).fill(0)
  const fieldSize = new Array(size).fill(null)
  const mine = -1
  const mineAmt = 5

  const inc = (x, y) => {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === mine) return
      field[y * size + x] += 1
    }
  }

  for (let i = 0; i < mineAmt; ) {
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)

    if (field[y * size + x] === mine) continue

    field[y * size + x] = mine

    i++

    inc(x + 1, y)
    inc(x - 1, y)
    inc(x, y + 1)
    inc(x, y - 1)
    inc(x + 1, y + 1)
    inc(x - 1, y + 1)
    inc(x + 1, y - 1)
    inc(x - 1, y - 1)
  }

  const openCell = (cell) => {}

  return (
    <div>
      <h1>Hello World!</h1>
      {fieldSize.map((string, y) => {
        return (
          <div key={y} className={styles.string}>
            {fieldSize.map((cell, x) => {
              console.log(y * size + x)
              return (
                <div key={y * size + x} /*className={styles.cell}*/>
                  {/* {field[y * size + x]} */}
                  <Cell
                    value={field[y * size + x]}
                    cellNum={y * size + x}
                    mine={mine}
                    isVisible={false}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Field
