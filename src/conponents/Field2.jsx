import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from '../redux/slices/fieldSlice'

import Cell2 from './Cell2'

import styles from './Field2.module.css'

function Field2({
  size,
  changeMineCounter,
  mineAmt,
  startTimer,
  stopTimer,
  openNameModal,
  changeGameState,
}) {
  const fieldRedux = useSelector((state) => state.fieldSlice)
  const dispatch = useDispatch()
  // console.log('Regen Field')

  const width = size[0]
  const height = size[1]
  const mine = -1
  const fieldWidth = new Array(width).fill(null)
  const fieldHeight = new Array(height).fill(null)

  const [field, setField] = useState(
    new Array(width * height).fill({
      value: 0,
      visible: false,
      isCheked: false,
      marked: false,
      exploded: false,
      missMarked: false,
    })
  )

  const [notOver, setNotOver] = useState(true)

  const [isTimer, setIsTimer] = useState(false)
  // const [notWin, setNotWin] = useState(true)

  // Функция изменяющие клетки вокруг целевой
  const changeAround = (fieldIn, cellNum, mod, self) => {
    let fieldMod = [...fieldIn]

    const x = cellNum % width
    const y = Math.floor(cellNum / width)

    const modFunc = (x, y) => {
      if (x >= 0 && x < width && y >= 0 && y < height) {
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

  // Функция генерации поля с расстановкой бомб
  useEffect(() => {
    console.log('Field effected')
    let fieldBomb = [...field]

    // Оптимизированная функция генерации поля
    // -------------------------------------------

    let fieldBombTEST = [...field]

    const bombIndexSet = new Set()

    while (bombIndexSet.size < size[2]) {
      bombIndexSet.add(Math.floor(Math.random() * width * height))
    }

    const bombIndexArr = Array.from(bombIndexSet)

    bombIndexArr.forEach((item) => {
      fieldBombTEST[item] = { ...fieldBombTEST[item], value: mine }
    })

    // -------------------------------------------

    for (let i = 0; i < size[2]; ) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      if (fieldBomb[y * width + x].value === mine) continue
      fieldBomb = fieldBomb.map((cell, item) => {
        return item === y * width + x ? { ...cell, value: mine } : { ...cell }
      })

      const inc = (cell) => {
        return cell.value === mine
          ? { ...cell }
          : { ...cell, value: cell.value + 1 }
      }

      fieldBomb = changeAround(fieldBomb, y * width + x, inc)

      i++
    }

    setField([...fieldBomb])
    dispatch(setField(fieldBomb))
  }, [])

  const show = (cell) => {
    return !cell.marked ? { ...cell, visible: true } : { ...cell }
  }

  // Функция открытия клетки
  const openCell = (cellNum) => {
    if (!isTimer) {
      setIsTimer(true)
      const startDate = new Date()
      const unixTime = Math.floor(startDate.getTime() / 1000)
      startTimer(unixTime)
    }
    let openField = field.map((cell, item) => {
      return item === cellNum ? { ...cell, visible: true } : { ...cell }
    })
    // пока не разобрался как решить вопрос с асинхронностью useState, делаю проверку по временному массиву

    if (checkWin(openField)) {
      openField = openField.map((cell, item) => {
        return cell.value === mine ? { ...cell, marked: true } : { ...cell }
      })
      stopTimer()
      setNotOver(false)
      changeMineCounter(0)
      openNameModal()
    }

    setField(openField)
  }

  // Открытие пустой клетки которая инициирует открытие соседних клеток
  const openZeroCell = (cellNum) => {
    if (!isTimer) {
      setIsTimer(true)
      const currentDate = new Date()
      const unixTime = Math.floor(currentDate.getTime() / 1000)
      startTimer(unixTime)
    }

    let zeroField = changeAround(field, cellNum, show, true)

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
    if (checkWin(zeroField)) {
      zeroField = zeroField.map((cell, item) => {
        return cell.value === mine ? { ...cell, marked: true } : { ...cell }
      })
      stopTimer()
      setNotOver(false)
      changeMineCounter(0)
      openNameModal()
    }

    setField([...zeroField])
    // пока не разобрался как решить вопрос с асинхронностью useState, дклаю проверку по временному массиву
  }

  // Функция окончания игры
  const gameOver = (cellNum) => {
    let overField = field.map((cell, item) => {
      return item === cellNum ? { ...cell, exploded: true } : { ...cell }
    })

    setField(
      overField.map((cell, item) => {
        return cell.value === mine
          ? { ...cell, visible: true }
          : cell.value !== mine && cell.marked
          ? { ...cell, visible: true, missMarked: true }
          : { ...cell }
      })
    )
    setNotOver(false)
    changeGameState(-1)
    stopTimer()
  }

  // Отметка флажком клетки
  const markCell = (cellNum) => {
    let markField = field.map((cell, item) => {
      return item === cellNum && !cell.visible
        ? { ...cell, marked: !cell.marked }
        : { ...cell }
    })
    let markedQty = size[2] - markField.filter((cell) => cell.marked).length
    changeMineCounter(markedQty)
    setField(markField)
  }

  // Проверка поля на окончание игры
  const checkWin = (field) => {
    const isWin = !!field.find(
      (item) => item.value !== mine && item.visible === false
    )
    return !isWin
  }

  return (
    <div className={styles.field}>
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
                    markCell={markCell}
                    checkWin={checkWin}
                    marked={field[y * width + x].marked}
                    exploded={field[y * width + x].exploded}
                    missMarked={field[y * width + x].missMarked}
                    notOver={notOver}
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
