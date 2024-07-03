import React from "react"
import './index.css'
import { BrowserRouter as Router  , Routes , Route } from "react-router-dom"
import Bodycomponent from "./Components/Bodycomponent.jsx"
import AdminLogin from "./Components/AdminLogin.jsx"

function App() {
  return (
    <Router>
    <>
    <div className='App'>
      <Routes>

        <Route path="/" element={ <AdminLogin /> } />
        <Route path="/admindash" element={ < Bodycomponent /> } />  
      
      </Routes>
    </div>
      
      
    </>
    </Router>
  )
}

export default App
