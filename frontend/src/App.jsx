import React from "react"
import './index.css'
import { BrowserRouter as Router  , Routes , Route } from "react-router-dom"
import Bodycomponent from "./Components/Bodycomponent.jsx"

function App() {
  return (
    <Router>
    <>
    <div className='App'>
      <h2>hhhh </h2>
      <Routes>

        <Route path="/admindash" element={ < Bodycomponent /> } />  
      
      </Routes>
    </div>
      
      
    </>
    </Router>
  )
}

export default App
