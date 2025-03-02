import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OrdreList from './OrdreList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          
            <OrdreList />
       

    </>
  )
}

export default App
