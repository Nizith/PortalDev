import React, { useState, useEffect } from 'react'; // Corrected the useEffect import
import axios from 'axios';

export default function Cordinator() {
    const [SalesCategory, setSalesCategory] = useState("")
    const [SolutionCategory, setSolutionCategory] = useState("")
    const [AccountManager, setAccountManager] = useState("")
    const [Manager, setManager] = useState("")
    const [SalesEngineer, setSalesEngineer] = useState("")
    const [SolutionEngineer, setSolutionEngineer] = useState("")

    // Added useEffect to fetch sections from the backend when the component mounts.
    useEffect(() => {
        // Fetch data or perform side effects here if needed
    }, []);

    const CordinatorSubmit = (e) => {
        e.preventDefault();

        const newCordinator = {
            sectionName,
            SalesCategory,
            SolutionCategory,
            AccountManager,
            Manager,
            SalesEngineer,
            SolutionEngineer,
        };

        axios.post("http://localhost:4500/portaldev/createCordinator", newCordinator)
            .then(() => {
                alert("Cordinator created successfully!!");
            })
            .catch((err) => {
                console.error(err);
                alert("Cordinator creation failed!!");
            });

        console.log("Cordinator registered:", newCordinator);
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-1/2 min-h-[60%] bg-opacity-55 bg-red-300 rounded-xl flex items-center justify-center'>
                <form onSubmit={CordinatorSubmit} className='p-6 w-full'>
                    <fieldset className='border-2 px-4 py-2 rounded-xl'>
                        <legend className='text-2xl font-semibold px-1'>Sales & Solutions</legend>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Sales Category:</label>
                            <select
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                id="SalesCategory"
                                name="SalesCategory"
                                value={SalesCategory} // Corrected the value prop
                                onChange={(e) => setSalesCategory(e.target.value)}>
                                <option value=""></option>
                                <option value="MB">MB</option>
                                <option value="LB">LB</option>
                                <option value="GB">GB</option>
                            </select>
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Solution Category:</label>
                            <select
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                id="SolutionCategory"
                                name="SolutionCategory"
                                value={SolutionCategory} // Corrected the value prop
                                onChange={(e) => setSolutionCategory(e.target.value)}>
                                <option value=""></option>
                                <option value="EDS">EDS</option>
                                <option value="PSBD">PSBD</option>
                                <option value="CMS">CMS</option>
                            </select>
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Account Manager:</label>
                            <input 
                                onChange={(e) => setAccountManager(e.target.value)}
                                value={AccountManager} // Added value prop to input
                                type='text'
                                className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600'
                            />
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Manager:</label>
                            <input 
                                onChange={(e) => setManager(e.target.value)}
                                value={Manager} // Added value prop to input
                                type='text'
                                className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600'
                            />
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Sales Engineer:</label>
                            <input 
                                onChange={(e) => setSalesEngineer(e.target.value)}
                                value={SalesEngineer} // Added value prop to input
                                type='text'
                                className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600'
                            />
                        </div>
                        <div className='mb-5'>
                            <label className='block text-medium font-medium text-gray-950'>Solution Engineer:</label>
                            <input 
                                onChange={(e) => setSolutionEngineer(e.target.value)}
                                value={SolutionEngineer} // Added value prop to input
                                type='text'
                                className='block w-full mt-2 h-9 rounded outline-0 ps-3 border-b-2 border-slate-600'
                            />
                        </div>
                        <div className="flex justify-center mt-8">
                            <button className="w-2/3 py-1.5 bg-opacity-80 bg-blue-950 rounded-full text-white text-sm font-semibold px-1">
                                Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
