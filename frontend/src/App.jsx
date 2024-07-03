import React from "react"
import './index.css'
import { BrowserRouter as Router  , Routes , Route } from "react-router-dom"
import Bodycomponent from "./Components/Admin/Bodycomponent.jsx"
import AdminLogin from "./Components/Admin/AdminLogin.jsx"
import Sectionregistration from "./Components/Admin/Sectionregistration.jsx"
import Supplier from "./Components/Admin/Supplier.jsx"

function App() {
  return (
    <Router>
    <>
    <div className='App'>
      <Routes>

        <Route path="/" element={ <AdminLogin /> } />
        <Route path="/admindash" element={ < Bodycomponent /> } />  
        <Route path="/sectionreg" element = { <Sectionregistration />} />
        <Route path="/supplierreg" element={<Supplier/>}/>
      
      </Routes>
    </div>
      
      
    </>
    </Router>
  )
}

export default App
