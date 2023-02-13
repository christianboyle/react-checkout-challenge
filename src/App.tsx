import { useState } from 'react'
import './App.css'

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState(0)
  const [lines, setLines] = useState([[], [], [], [], []])

  function addPersonToLine(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <main className='App'>
      <form onSubmit={addPersonToLine}>
        <input
          required
          type='number'
          value={itemsInPersonCart}
          onChange={(e) => setItemsInPersonCart(e.currentTarget.valueAsNumber)}
        ></input>
        <button>Checkout</button>
      </form>

      <div className='lines'>
        {lines.map((people, idx) => (
          <div key={idx}>X</div>
        ))}
      </div>
    </main>
  )
}

export default App
