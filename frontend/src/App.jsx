import React from "react"
import './index.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Bodycomponent from "./Components/Admin/Bodycomponent.jsx"
import CustomerAdd from "./Components/Admin/CustomerAdd.jsx"
import PaymentAdd from "./Components/Payment/PaymentAdd.jsx"
import Payment from "./Components/Payment/Payment.jsx"
import Login from "./Components/Login/Login.jsx"
import LandingPage from "./Components/Login/LandingPage.jsx"
import Section from "./Components/Admin/Section.jsx"
import SupplierTable from "./Components/Admin/SupplierTable.jsx"
import CordinatorComponent from "./Components/Admin/CordinatorComponent.jsx"
import Sidebar from "./Components/Login/Sidebar.jsx"
import ContractAdd from "./Components/contract/ContractAdd.jsx"
import ViewContract from "./Components/contract/ViewContract.jsx"


function Layout({ children }) {
  const location = useLocation();

  // Conditionally render Sidebar based on the current path
  const hideSidebar = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="App">
      {!hideSidebar && <Sidebar />}
      <div className={!hideSidebar ? "ml-[20%]" : ""}>
        {children}
      </div>
    </div>
  );
}



function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* First Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Pages */}
          <Route path="/admindashboard" element={< Bodycomponent />} />

          <Route path="/addsupplier" element={<SupplierTable />} />
          <Route path="/addcustomer" element={<CustomerAdd />} />
          <Route path="/addcordinator" element={<CordinatorComponent />} />
          <Route path="/addsection" element={<Section />} />


          {/* 
          <Route path="/customer" element={<Customer />} />
          <Route path="/section" element={<Section />} />
          <Route path="/suppliertable" element={<SupplierTable />} />
          <Route path="/addcordinator" element={<Cordinator />} />
          <Route path="/cordinatortable" element={<Cordinator />} />
           */}

          {/* User Pages */}
          <Route path="/addcontract" element={<ContractAdd />} />
          <Route path="/viewcontract" element={<ViewContract />} />
          <Route path="/addpayment" element={<PaymentAdd />} />
          <Route path="/payment" element={<Payment />} />

        </Routes>
      </Layout>
    </Router>
  )
}

export default App
