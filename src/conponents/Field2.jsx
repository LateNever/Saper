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
    new Array(width * height).fill({ value: 0, visible: true })
  )

  const changeAround = (fieldIn, cellNum, mod) => {
    // console.log(cellNum)
    // console.log(fieldIn)

    let fieldMod = [...fieldIn]

    const x = (cellNum % width) - 1
    const y = Math.ceil(cellNum / width - 1)

    const modFunc = (x, y) => {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        // console.log(y * width + x)
        mod(fieldMod[y * width + x])

        fieldMod = fieldMod.map((cell, item) => {
          return item === y * width + x
            ? mod(fieldMod[y * width + x])
            : { ...cell }
        })
      }
    }

    // modFunc(fieldMod[(x + 1, y)])
    // modFunc(fieldMod[(x - 1, y)])
    // modFunc(fieldMod[(x, y + 1)])
    // modFunc(fieldMod[(x, y - 1)])
    // modFunc(fieldMod[(x + 1, y + 1)])
    // modFunc(fieldMod[(x - 1, y + 1)])
    // modFunc(fieldMod[(x + 1, y - 1)])
    // modFunc(fieldMod[(x - 1, y - 1)])

    modFunc(x + 1, y)
    modFunc(x - 1, y)
    modFunc(x, y + 1)
    modFunc(x, y - 1)
    modFunc(x + 1, y + 1)
    modFunc(x - 1, y + 1)
    modFunc(x + 1, y - 1)
    modFunc(x - 1, y - 1)

    return [...fieldMod]

    // if (cellNum > 0) {mod(fieldMod[cellNum - 1])}
  }

  // const x = 1 % width
  // const y = Math.ceil(1 / width)
  // console.log(x)
  // console.log(y)

  // changeAround(6)

  // for (let i = 0; i < mineAmt; ) {
  //   const x = Math.floor(Math.random() * width)
  //   const y = Math.floor(Math.random() * height)

  // console.log(field[2].visible)

  // setField(
  // const bombField = field.map((cell, item) => {
  //   console.log({ ...cell })
  //   return item === 2 ? { ...cell, value: mine } : { ...cell }
  // })

  // console.log(bombField)
  // )

  // console.log(field)

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

      fieldBomb = changeAround(fieldBomb, y * width + x + 1, inc)

      i++
    }

    // console.log(fieldBomb)

    setField([...fieldBomb])
  }, [])

  // console.log(fieldBomb)

  // for (let i = 0; i < mineAmt; ) {
  //   const x = Math.floor(Math.random() * width)
  //   const y = Math.floor(Math.random() * height)

  //   console.log(field[y * width + x])

  //   if (field[y * width + x].value === mine) continue

  //   field[y * width + x].value = mine

  //   i++
  // }

  // console.log(field)

  // setField()

  // console.log(field[y * width + x].value)
  // console.log(field[1].value)
  // console.log(field[2].value)
  // console.log(field[3].value)
  // console.log(field[4].value)
  // console.log(field[5].value)
  // console.log(y * width + x)

  // if (field[y * width + x].value === mine) continue

  // field[y * width + x].value = mine

  // i++

  // inc(x + 1, y)
  // inc(x - 1, y)
  // inc(x, y + 1)
  // inc(x, y - 1)
  // inc(x + 1, y + 1)
  // inc(x - 1, y + 1)
  // inc(x + 1, y - 1)
  // inc(x - 1, y - 1)
  // }

  return (
    <div>
      {fieldHeight.map((string, y) => {
        // console.log(y)
        return (
          <div key={y} className={styles.string}>
            {fieldWidth.map((cell, x) => {
              // console.log(field[y * width + x].value)
              return (
                <div key={y * width + x}>
                  {/* <div>{y * width + x}</div> */}
                  <Cell2
                    value={field[y * width + x].value}
                    // cellNum={y * size + x}
                    mine={mine}
                    isVisible={field[y * width + x].visible}
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
