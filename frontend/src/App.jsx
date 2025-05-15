import React, { useEffect, useState } from "react"
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
import UserRoleTable from "./Components/Admin/UserRoleTable.jsx"
import Document from "./Components/Admin/Document.jsx"
import Notification from "./Components/Admin/Notification.jsx"
import { jwtDecode } from "jwt-decode"
import SessionExpiredModal from "./Components/SessionExpiredModal"

function Layout({ children }) {
  const location = useLocation();
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Check if the token is expired
    let timer;
    try {
      const decoded = jwtDecode(token);
      const expiry = decoded.exp * 1000;
      const now = Date.now();
      const timeout = expiry - now;

      if (timeout > 0) {
        timer = setTimeout(() => {
          setShowSessionExpired(true);
        }, timeout);
      } else {
        setShowSessionExpired(true);
      }

    } catch (e) {
      setShowSessionExpired(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };

  }, [location]);

  // Conditionally render Sidebar based on the current path
  const hideSidebar = location.pathname === '/' || location.pathname === '/login';

  // Handle session expired modal
  const handleSessionExpiredOk = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
    setShowSessionExpired(false);
  };

  return (
    <div className="App">

      {/* Sidebar */}
      {!hideSidebar && <Sidebar />}
      <div className={!hideSidebar ? "ml-[20%]" : ""}>
        {children}
      </div>

      {/* Session Expired Modal */}
      {showSessionExpired && (
        <SessionExpiredModal onOk={handleSessionExpiredOk} />
      )}

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
          <Route path="/admindashboard" element={< Dashboard />} />
          <Route path="/mssdashboard" element={< Dashboard />} />
          <Route path="/sstdashboard" element={< Dashboard />} />

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