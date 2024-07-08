import React from "react"
import './index.css'
import { BrowserRouter as Router  , Routes , Route } from "react-router-dom"
import Bodycomponent from "./Components/Admin/Bodycomponent.jsx"
import AdminLogin from "./Components/Admin/AdminLogin.jsx"
import Sectionregistration from "./Components/Admin/SectionAdd.jsx"
import Supplier from "./Components/Admin/SupplierAdd.jsx"
import CustomerAdd from "./Components/Admin/CustomerAdd.jsx"

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
        <Route path="/createcustomer" element = {<CustomerAdd/>} />
      
      </Routes>
    </div>
      
      
    </>
    </Router>
  )
}

export default App
