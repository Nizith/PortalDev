import React from "react"
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Bodycomponent from "./Components/Admin/Bodycomponent.jsx"
import Sectionregistration from "./Components/Admin/SectionAdd.jsx"
import Supplier from "./Components/Admin/SupplierAdd.jsx"
import CustomerAdd from "./Components/Admin/CustomerAdd.jsx"
import ContractAdd from "./Components/ContractAdd.jsx"
import PaymentAdd from"./Components/PaymentAdd.jsx"
import Login from "./Components/Login/Login.jsx"
import LandingPage from "./Components/Login/LandingPage.jsx"

function App() {
  return (
    <Router>
      <>
        <div className='App'>
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admindash" element={< Bodycomponent />} />
            <Route path="/addsection" element={<Sectionregistration />} />
            <Route path="/addsupplier" element={<Supplier />} />
            <Route path="/addcustomer" element={<CustomerAdd />} />
            <Route path="/addcontract" element={<ContractAdd />} />
            <Route path="/addpayment" element={<PaymentAdd />} />

          </Routes>
        </div>


      </>
    </Router>
  )
}

export default App
