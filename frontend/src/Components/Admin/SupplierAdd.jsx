import React, { useState,useEffect} from 'react';
import axios from 'axios';

export default function Supplier() {
  const [SRno,setSRno] = useState("")
  const [name,setName] = useState("")
  const [category,setcategory] = useState("")
  const [mobile,setmobile] = useState("")
  const [description,setdescription] = useState("")
 
//Added useEffect to fetch sections from the backend when the component mounts.
//sections state is used to store the fetched sections.



  const SuplierSubmit = (e) => {
      e.preventDefault()

      const newSuplier = {SRno, name, category, mobile,description}

      axios.post("http://localhost:4500/portaldev/createsupplier", newSuplier)
      .then(() => {
        alert("Supplier created successfully!!")
      })
      .catch((err) => {
          console.error(err)
          alert("Supplier created failed!!")
      })

      console.log("Supplier registered:",{SRno,category, mobile,description});

  }

  return (
    <div className="w-screen h-screen fixed flex justify-center">
      <div className="my-auto w-1/2 h-3/4 bg-emerald-400">
        <form onSubmit={SuplierSubmit} className="p-10">

        <div className="mb-5">
            <label>Supplier Rejistration number:</label>
            <input onChange = {(e) => {setSRno(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>
          
          <div className="mb-5">
            <label>Supplier Name:</label>
            <input onChange = {(e) => {setName(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>
          
          <div className="mb-5">
            <label>Supplier category:</label>
            <input onChange = {(e) => {setcategory(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>

          <div className="mb-5">
            <label>Contact number:</label>
            <input onChange = {(e) => {setmobile(e.target.value)}}
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>

          <div className="mb-5">
            <label>Description:</label>
            <input onChange = {(e) => {setdescription(e.target.value)}}
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>
          
          

          <div className="flex justify-center mt-8">
            <button className="w-full py-1.5 bg-slate-600 rounded text-white">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
