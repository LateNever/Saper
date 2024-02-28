import { useState } from 'react'
import { useEffect } from 'react'

import Cell2 from './Cell2'

import styles from './Field2.module.css'

function Field2({ width, height, mineAmt }) {
  // const field = new Array(width * height).fill({ value: 0, visible: true })
  const fieldWidth = new Array(width).fill(null)
  const fieldHeight = new Array(height).fill(null)
  const mine = -1

  const [field, setField] = useState(
    new Array(width * height).fill({
      value: 0,
      visible: false,
      isCheked: false,
    })
  )

  const changeAround = (fieldIn, cellNum, mod, self) => {
    // console.log(cellNum)
    // console.log(fieldIn)

    let fieldMod = [...fieldIn]

    const x = cellNum % width
    const y = Math.floor(cellNum / width)

    const modFunc = (x, y) => {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        // console.log(y * width + x)
        // mod(fieldMod[y * width + x])

        fieldMod = fieldMod.map((cell, item) => {
          return item === y * width + x
            ? mod(fieldMod[y * width + x])
            : { ...cell }
        })
      }
    }

    fieldMod = fieldMod.map((cell, item) => {
      return item === cellNum ? { ...cell, isCheked: true } : { ...cell }
    })

    modFunc(x + 1, y)
    modFunc(x - 1, y)
    modFunc(x, y + 1)
    modFunc(x, y - 1)
    modFunc(x + 1, y + 1)
    modFunc(x - 1, y + 1)
    modFunc(x + 1, y - 1)
    modFunc(x - 1, y - 1)

    self && modFunc(x, y)

    return [...fieldMod]
  }

  useEffect(() => {
    let fieldBomb = [...field]

    for (let i = 0; i < mineAmt; ) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      // console.log(y * width + x)
      if (fieldBomb[y * width + x].value === mine) continue
      fieldBomb = fieldBomb.map((cell, item) => {
        return item === y * width + x ? { ...cell, value: mine } : { ...cell }
      })

      const inc = (cell) => {
        // console.log(cell.value)
        return cell.value === mine
          ? { ...cell }
          : { ...cell, value: cell.value + 1 }
      }

      fieldBomb = changeAround(fieldBomb, y * width + x, inc)

      i++
    }

    setField([...fieldBomb])
  }, [])

  const openCell = (cellNum) => {
    setField(
      field.map((cell, item) => {
        return item === cellNum ? { ...cell, visible: true } : { ...cell }
      })
    )
  }

  const show = (cell) => {
    // console.log(cell.value)
    return { ...cell, visible: true }
  }

  const openZeroCell = (cellNum) => {
    let zeroField = changeAround(field, cellNum, show, true)

    // console.log(zeroField.includes({ value: 0, visible: true }))
    // let obj = !!zeroField.find(
    //   (item) => item.value === 0 && item.visible === true
    // )
    // console.log(obj)

    while (
      !!zeroField.find(
        (item) =>
          item.value === 0 && item.visible === true && item.isCheked === false
      )
    ) {
      zeroField.map((cell, item) => {
        cell.value === 0 &&
          cell.visible === true &&
          (zeroField = changeAround(zeroField, item, show, true))
      })
    }

    setField([...zeroField])
  }

  const gameOver = (cellNum) => {
    console.log('hi')
  }

  return (
    <div>
      {fieldHeight.map((string, y) => {
        return (
          <div key={y} className={styles.string}>
            {fieldWidth.map((cell, x) => {
              return (
                <div key={y * width + x}>
                  <Cell2
                    value={field[y * width + x].value}
                    cellNum={y * width + x}
                    mine={mine}
                    visible={field[y * width + x].visible}
                    openCell={openCell}
                    openZeroCell={openZeroCell}
                    gameOver={gameOver}
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

export default Field2
