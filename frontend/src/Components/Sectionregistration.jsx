import React, { useState } from 'react'


function Sectionregistration() {


 const [sectionID ,setSectionID] = useState('');
 const [sectionName,setSectionName] = useState('');

 const handleSubmit = (e)=>{
    e.preventDefault();

    console.log("section rejistered :", {sectionID,sectionName});

 }






  return (
    <>

    
    <div className="w-screen h-screen fixed flex justify-center">
        <div className="bg-amber-100 w-1/2 h-1/2 my-auto">
           <form onSubmit ={handleSubmit}  className="p-10 rounded" >
             <h1 className="flex justify-center -mt-3 mb-5 text-2xl font-bold">Section Rejistration Form</h1>
           <div className="mb-5">
               <label htmlFor="sectionID">Section ID:</label>
               <input type="text" id='sectionID' value={sectionID} onChange={(e)=> setSectionID(e.target.value)}
               className="block w-full mt-2 h-8 rounded outline-0 ps-3" />
           </div>

            <div className='mb-5'>
               <label htmlFor="sectionName"> Section Name</label>
            <input type="text" id='sectionName' value={sectionName} onChange={(e)=>setSectionName(e.target.value)} 
               className="block w-full  mt-2 h-8 rounded outline-0 ps-3" />
           </div>

   
        <button type='submit' className="w-full py-1.5 rounded bg-slate-600 text-white "> Rejister</button>
    
    
            </form>
        </div>
    </div>
    
    </>
  )
}

export default Sectionregistration