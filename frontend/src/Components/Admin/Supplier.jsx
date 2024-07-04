import React, { useState,useEffect} from 'react';
import axios from 'axios';

export default function Supplier() {
  const [name,setName] = useState("")
  const [age,setAge] = useState(0)
  const [sections,setSections] = useState([])
  const [sectionID,setSelectedSection]=useState("");
//Added useEffect to fetch sections from the backend when the component mounts.
//sections state is used to store the fetched sections.

 useEffect(() => {

  function rdSection(){
  axios.get("http://localhost:4500/portaldev/readsection")
    .then((res) => {
      setSections(res.data.sections);
    })
    .catch((error) => {
      console.error('Error fetching sections:',error);
    });
  }rdSection();
 },[])

  const SuplierSubmit = (e) => {
      e.preventDefault()

      const newSuplier = {name,age, sectionID}

      axios.post("http://localhost:4500/portaldev/createsupplier", newSuplier)
      .then(() => {
        alert("Supplier created successfully!!")
      })
      .catch((err) => {
          console.error(err)
          alert("Supplier created failed!!")
      })

      console.log("Supplier registered:",{name,age,sectionID});

  }

  return (
    <div className="w-screen h-screen fixed flex justify-center">
      <div className="my-auto w-1/2 h-1/2 bg-amber-100">
        <form onSubmit={SuplierSubmit} className="p-10">

        <div className='mb-5'>
            <label>Section:</label>
            <select 
            onChange={(e) => {setSelectedSection(e.target.value)}}
            className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-r-slate-600'
            
            >
              <option value="" >Select a Section</option>
              {sections.map((section) =>(
                <option  value={section.sectionID}>
                  {section.sectionID}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-5">
            <label>Name:</label>
            <input onChange = {(e) => {setName(e.target.value)}} 
            type='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
          </div>

          <div className="mb-5">
            <label>Age:</label>
            <input onChange = {(e) => {setAge(e.target.value)}}
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
