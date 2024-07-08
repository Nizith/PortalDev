import React from 'react'
import { useNavigate } from 'react-router-dom'

function Bodycomponent() {

  const navigate = useNavigate();

  const navigateToSupplierRegistration = () => {
    navigate('/supplierreg')
  };

  const navigateToSectionRegistration = () => {
    navigate('/sectionreg')
  };

  return (
    <>
      <div className="button-container">
        <button onClick={navigateToSupplierRegistration} className="w-1/4 py-1.5 rounded bg-teal-500 text-white  " >suplier rejistration</button>
        <button onClick={navigateToSectionRegistration} className="w-1/4 py-1.5 rounded bg-teal-500 text-white " >Section rejistration</button>
      </div>
    </>
  )
}

export default Bodycomponent