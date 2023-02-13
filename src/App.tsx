import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState<number>(0)
  const [lines, setLines] = useState([[10, 5, 2], [1], [2], [3], [4]])

  function addPersonToLine(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (itemsInPersonCart === undefined || itemsInPersonCart <= 0) return

    let leastItemsAmount = 1e9
    let lineWithLeast: number[] | undefined = undefined

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0)
      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine
        lineWithLeast = line
      }
    }

    if (!lineWithLeast) return

    setLines((prevLines) =>
      prevLines.map((line) =>
        line === lineWithLeast ? [...line, itemsInPersonCart] : line
      )
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        )
      )
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <main className='App'>
      <form onSubmit={addPersonToLine}>
        <input
          required
          type='number'
          value={itemsInPersonCart}
          onChange={(e) => {
            setItemsInPersonCart(e.currentTarget.valueAsNumber)
          }}
        ></input>
        <button>Checkout</button>
      </form>

      <div className='lines'>
        {lines.map((line, idx) => (
          <div className='line' key={idx}>
            {line.map((numberOfItems, lineIdx) => (
              <div key={lineIdx}>{numberOfItems}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
