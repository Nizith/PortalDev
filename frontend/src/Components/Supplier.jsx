import React from 'react';
import './Supplier.css';

export default function Supplier() {

  return (
    <div className="w-screen h-screen fixed flex justify-center">
      <div className="my-auto w-1/2 h-1/2 bg-amber-100">
          <form className="p-10">
              <div className="mb-5">
                <label>Name:</label>
                <input type ='text'className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />


              </div>
              <div className="mb-5">
                <label>Age:</label>
                <input type ='text' className="block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600" />
                


              </div>
              <div className="flex justify-center mt-8">
              <button className="w-full py-1.5 bg-slate-600 rounded text-white">Submit</button>
              </div>



          </form>
      </div>






    </div>
  )
}
