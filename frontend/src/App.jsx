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
import Customer from './Components/Admin/Customer.jsx'
import Section from "./Components/Admin/Section.jsx"
import SupplierTable from "./Components/Admin/SupplierTable.jsx"
import Cordinator from "./Components/Cordinators.jsx"
import CordinatorTable from "./Components/Admin/CordinatorTable.jsx"

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
            <Route path="/addcordinator" element={<Cordinator />} />
            <Route path="/addcontract" element={<ContractAdd />} />
            <Route path="/addpayment" element={<PaymentAdd />} />

            <Route path="/customer" element={<Customer/>} />

            <Route path="/section" element={<Section/>} />
            <Route path="/suppliertable" element={<SupplierTable/>} />
            <Route path="/addcordinator" element={<Cordinator />} />
            <Route path="/cordinatortable" element={<CordinatorTable/>} />

          </Routes>
        </div>


      </>
    </Router>
  )
}

export default App
