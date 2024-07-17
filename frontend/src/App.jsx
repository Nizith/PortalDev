import React from "react"
import './index.css'
import { BrowserRouter as Router  , Routes , Route } from "react-router-dom"
import Bodycomponent from "./Components/Admin/Bodycomponent.jsx"
import AdminLogin from "./Components/Admin/AdminLogin.jsx"
import Sectionregistration from "./Components/Admin/SectionAdd.jsx"
import Supplier from "./Components/Admin/SupplierAdd.jsx"
import CustomerAdd from "./Components/Admin/CustomerAdd.jsx"
<<<<<<< HEAD
import ContractAdd from "./ContractAdd.jsx"
=======
import PaymentAdd from "./Components/PaymentAdd.jsx"
>>>>>>> 795aa99ea6bd1e5e6ec45dbd8267469ef3d030e5

function App() {
  return (
    <Router>
    <>
    <div className='App'>
      <Routes>

        <Route path="/" element={ <AdminLogin /> } />
        <Route path="/admindash" element={ < Bodycomponent /> } />  
<<<<<<< HEAD
        <Route path="/addsection" element = { <Sectionregistration />} />
        <Route path="/addsupplier" element={<Supplier/>}/>
        <Route path="/addcustomer" element = {<CustomerAdd/>} />
        <Route path="/addcontract" element = {<ContractAdd/>} />
        
=======
        <Route path="/sectionreg" element = { <Sectionregistration />} />
        <Route path="/supplierreg" element={<Supplier/>}/>
        <Route path="/createcustomer" element = {<CustomerAdd/>} />
        <Route path="/addpayment" element = {<PaymentAdd/>}/>

      
>>>>>>> 795aa99ea6bd1e5e6ec45dbd8267469ef3d030e5
      </Routes>
    </div>
      
      
    </>
    </Router>
  )
}

export default App
