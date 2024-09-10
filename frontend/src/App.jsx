import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Bodycomponent from "./Components/Admin/Bodycomponent.jsx";
import Sectionregistration from "./Components/Admin/SectionAdd.jsx";
import Supplier from "./Components/Admin/SupplierAdd.jsx";
import CustomerAdd from "./Components/Admin/CustomerAdd.jsx";
import PaymentAdd from "./Components/PaymentAdd.jsx";
import Login from "./Components/Login/Login.jsx";
import LandingPage from "./Components/Login/LandingPage.jsx";
import Customer from './Components/Admin/Customer.jsx';
import Section from "./Components/Admin/Section.jsx";
import SupplierTable from "./Components/Admin/SupplierTable.jsx";
import Cordinator from "./Components/Cordinators.jsx";
import CordinatorTable from "./Components/Admin/CordinatorTable.jsx";
import ViewContract from "./Components/contract/ViewContract.jsx";
import ContractAdd from "./Components/contract/ContractAdd.jsx";
import Sidebar from "./Components/Login/Sidebar.jsx";

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
          <Route path="/admindashboard" element={<Bodycomponent />} />
          
          <Route path="/suppliertable" element={<SupplierTable />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/cordinatortable" element={<CordinatorTable />} />
          <Route path="/section" element={<Section />} />


          {/* User Pages */}
          <Route path="/addcontract" element={<ContractAdd />} />
          <Route path="/viewcontract" element={<ViewContract />} />
          <Route path="/addpayment" element={<PaymentAdd />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
