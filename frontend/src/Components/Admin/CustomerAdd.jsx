import React, { useState } from 'react'
import axios from 'axios'

export default function CustomerAdd() {

 const [BRnumber,setBRnumber] = useState("")
 const [name,setname] = useState("")
 const [email,setemail] = useState("")
 const [contact,setcontact] = useState(0)


  const CustomerSubmit = (e) => {
    e.preventDefault()

    const newCustomer = {BRnumber , name, email ,contact }

    axios.post("http://localhost:4500/portaldev/createcustomer" , newCustomer)
    .then(() => {
        alert("Customer created successsfully")
    })
    .catch((err) => {
        console.error(err)
        alert("customer creation failed")
    })

    console.log("Customer registered :" , {BRnumber , name, email ,contact });

  }

  return (
    <>
    <div className="w-screen h-screen fixed flex justify-center">
        <div className="my-auto w-1/2 h-3/4 bg-emerald-400">
            <form onSubmit={CustomerSubmit} className="p-10">

            <div className="mb-5">
            <label>Bussiness Rejistration number:</label>
            <input onChange = {(e) => {setBRnumber(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>


          <div className="mb-5">
            <label>Customer name:</label>
            <input onChange = {(e) => {setname(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>


          <div className="mb-5">
            <label>Customer Email:</label>
            <input onChange = {(e) => {setemail(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>


          <div className="mb-5">
            <label>Customer contact number:</label>
            <input onChange = {(e) => {setcontact(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>

          <div className="flex justify-center mt-8">
            <button className="w-full py-1.5 bg-slate-600 rounded text-white">Submit</button>
          </div>


            </form>
        </div>
    </div>
    
    
    </>
  )
}
