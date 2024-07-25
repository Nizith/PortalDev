import React, { useState, UseEffect } from 'react';
import axios from 'axios';

export default function Cordinator() {
    const [sectionName, setsectionName] = useState("")
    const [SalesCategory, setSalesCategory] = useState("")
    const [SolutionCategory, setSolutionCategory] = useState("")
    const [AccountManager, setAccountManager] = useState("")
    const [Manager, setManager] = useState("")
    const [SalesEngineer, setSalesEngineer] = useState("")
    const [SolutionEngineer, setSolutionEngineer] = useState("")

    //Added useEffect to fetch sections from the backend when the component mounts.

    const CordinatorSubmit = (e) => {
        e.preventDefault()

        const newCordinator = { sectionName, SalesCategory, SolutionCategory, AccountManager, Manager, SalesEngineer, SolutionEngineer }

        axios.post("http://localhost:4500/portaldev/createCordinator", newCordinator)
            .then(() => {
                alert("Cordinator created Successfully!!")
            })
            .catch((err) => {
                console.error(err)
                alert("Cordinator created failed!!")
            })

        console.log("Cordinator registered:", { sectionName, SalesCategory, SolutionCategory, AccountManager, Manager, SalesEngineer, SolutionEngineer });
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-1/2  min-h-[60%] bg-opacity-55 bg-red-300 rounded-xl flex items-center justify-center '>
                <form onSubmit={CordinatorSubmit} className='p-6 w-full'>
                    <fieldset className='border-2  px-4 py-2  rounded-xl'>
                        <legend className='text-2xl font-semibold px-1 '>Sales&Solutions</legend>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>SalesCategory:</label>
                            <select
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                id="SalesCategory"
                                name="SalesCategory"
                                value={setSalesCategory}
                                onChange={(e) => { setSalesCategory(e.target.value) }}>

                                <option value=""></option>
                                <option value="MB">MB</option>
                                <option value="LB">LB</option>
                                <option value="GB">GB</option>

                            </select>
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>SolutionCategory:</label>
                            <select
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                id="SolutionCategory"
                                name="SolutionCategory"
                                value={setSolutionCategory}
                                onChange={(e) => { setSolutionCategory(e.target.value) }}>
                                    
                                <option value=""></option>
                                <option value="EDS">EDS</option>
                                <option value="PSBD">PSBD</option>

                            </select>
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>AccountManager:</label>
                            <input onChange={(e) => { setAccountManager(e.target.value) }}
                                type='text' className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600' />
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Manager:</label>
                            <input onChange={(e) => { setManager(e.target.value) }}
                                type='text' className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600' />
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>SalesEngineer:</label>
                            <input onChange={(e) => { setSalesEngineer(e.target.value) }}
                                type='text' className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600' />
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>SolutionEngineer:</label>
                            <input onChange={(e) => { setSolutionEngineer(e.target.value) }}
                                type='text' className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600' />
                        </div>
                        <div className="flex justify-center mt-8">
                            <button className="w-2/3 py-1.5 bg-opacity-80 bg-blue-950 rounded-full text-white text-sm font-semibold px-1 ">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>


//bg-teal-950



    )
}
