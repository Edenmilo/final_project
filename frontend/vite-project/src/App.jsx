import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/calendar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DemaoCalendar/>
    </>
  )
}

export default App
