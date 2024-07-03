import React from 'react'
import {useNavigate} from 'react-router-dom'

function Bodycomponent() {

    const navigate = useNavigate();



    const navigateToSupplierRegistration = () => {
      navigate('/suplierrej')
    };
  
    const navigateToSectionRegistration = () => {
      navigate('/sectionrej')
    };



  return (
    
    <>
           <div>hello</div>

           <div className="button-container">


         <button onClick={navigateToSupplierRegistration } >suplier rejistration</button>
           <button onClick={navigateToSectionRegistration} >Section rejistration</button>

            </div>
    
    </>



  )
}

export default Bodycomponent