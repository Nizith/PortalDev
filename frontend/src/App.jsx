import React from "react"
import './index.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
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
import ManageContracts from "./Components/contract/ManageContracts.jsx"
import Dashboard from "./Components/Dashboard/Dashboard.jsx"
import UserManagement from "./Components/Admin/UserManagement.jsx"
import UserDashboard from "./Components/Admin/UserDashboard.jsx"
import UserRoleTable from "./Components/Admin/UserRoleTable.jsx"
import Document from "./Components/Admin/Document.jsx"
import Notification from "./Components/Admin/Notification.jsx"


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

const userRole = localStorage.getItem('role');
console.log("Logged User : ", userRole);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* First Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Pages */}
          <Route path="/admindashboard" element={< Dashboard />} />
          <Route path="/mssdashboard" element={< Dashboard />} />
          <Route path="/sstdashboard" element={< UserDashboard />} />

          <Route path="/addcontract" element={<ContractAdd />} />
          <Route path="/contracts" element={<ManageContracts />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/suppliers" element={<SupplierTable />} />
          <Route path="/customers" element={<CustomerAdd />} />
          <Route path="/cordinators" element={<CordinatorComponent />} />
          <Route path="/sections" element={<Section />} />


          {/* 
          <Route path="/customer" element={<Customer />} />
          <Route path="/section" element={<Section />} />
          <Route path="/suppliertable" element={<SupplierTable />} />
          <Route path="/addcordinator" element={<Cordinator />} />
          <Route path="/cordinatortable" element={<Cordinator />} />
           */}

          {/* User Pages */}
          <Route path="/addcontract" element={<ContractAdd />} />
          <Route path="/viewcontracts" element={<ViewContract />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/addpayment" element={<PaymentAdd />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/users" element={<UserRoleTable />} />

        </Routes>
      </Layout>
    </Router>
  )
}

export default App