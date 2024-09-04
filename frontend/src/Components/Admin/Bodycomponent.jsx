import React from 'react'
import { useNavigate } from 'react-router-dom'

function Bodycomponent() {

  const navigate = useNavigate();

  const navigateToSupplierRegistration = () => {
    navigate('/addsupplier')
  };

  const navigateToSectionRegistration = () => {
    navigate('/addsection')
  };


  const navigateToCoordinatorRegistration = () => {
    navigate('/addcordinator')
  };

  const navigateToCustomerRegistration = () => {
    navigate('/addcustomer')
  };

  return (
    <>
      <div className="flex justify-center fixed w-screen h-screen">
        <div className='w-4/5 h-3/5 flex m-auto'>
          <div className="w-1/5 h-full mx-7 rounded-3xl py-1.5 bg-green-500 text-white">
            <button onClick={navigateToSupplierRegistration} className='bg-blue-800 px-4 py-1.5 rounded-xl ml-12 mt-80' >Add Supplier</button>
          </div>
          <div className="w-1/5 h-full mx-7 rounded-3xl py-1.5 bg-green-500 text-white">
            <button onClick={navigateToCustomerRegistration} className='bg-blue-800 px-4 py-1.5 rounded-xl ml-12 mt-80' >Add Customer</button>
          </div>
          <div className="w-1/5 h-full mx-7 rounded-3xl py-1.5 bg-green-500 text-white">
            <button onClick={navigateToCoordinatorRegistration} className='bg-blue-800 px-4 py-1.5 rounded-xl ml-12 mt-80' >Add Coordinator</button>
          </div>
          <div className="w-1/5 h-full mx-7 rounded-3xl py-1.5 bg-green-500 text-white">
            <button onClick={navigateToSectionRegistration} className='bg-blue-800 px-4 py-1.5 rounded-xl ml-16 mt-80' >Add Section</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bodycomponent