import React from "react";

const StepTwo = ({ formData, handleChange, coordinators, handleSubmit }) => (
    <div>
        <div className='flex items-center justify-center'>
            <div className='bg-zinc-200 border border-neutral-500 rounded-2xl p-8 w-full max-w-4xl'>
                <form className='m-5' onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <label>Subject Clerk :</label>
                        <input
                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                            type="text"
                            id="subjectClerk"
                            name="subjectClerk"
                            value={formData.subjectClerk}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <fieldset className='border-2 border-green-600 p-5 rounded'>
                            <legend className='text-lg font-semibold text-indigo-600 ms-5 px-2'>Sales & Solution Team</legend>
                            <div className='grid grid-cols-2 gap-x-5'>
                                <div>
                                    <div className='mb-3'>
                                        <label>Sales Team :</label>
                                        <select
                                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                            id="salesTeam"
                                            name="salesTeam"
                                            value={formData.salesTeam}
                                            onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            <option value="MB">MB</option>
                                            <option value="LB">LB</option>
                                            <option value="GB">GB</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label>AccountManager :</label>
                                        <select
                                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                            id="accountManager"
                                            name="accountManager"
                                            value={formData.accountManager}
                                            onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                <option key={coordinator._id} value={coordinator.AccountManager}>{coordinator.AccountManager}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Manager :</label>
                                        <select
                                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                            id="manager"
                                            name="manager"
                                            value={formData.manager}
                                            onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                <option key={coordinator._id} value={coordinator.Manager}>{coordinator.Manager}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='mb-3'>
                                        <label>Solution Team :</label>
                                        <select
                                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                            id="solutionTeam"
                                            name="solutionTeam"
                                            value={formData.solutionTeam}
                                            onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            <option value="EDS">EDS</option>
                                            <option value="PSBD">PSBD</option>
                                            <option value="CMS">CMS</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Sales Engineer:</label>
                                        <select
                                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                            id="salesEngineer"
                                            name="salesEngineer"
                                            value={formData.salesEngineer}
                                            onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                <option key={coordinator._id} value={coordinator.SalesEngineer}>{coordinator.SalesEngineer}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Solution Engineer :</label>
                                        <select
                                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                            id="solutionEngineer"
                                            name="solutionEngineer"
                                            value={formData.solutionEngineer}
                                            onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                <option key={coordinator._id} value={coordinator.SolutionEngineer}>{coordinator.SolutionEngineer}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

export default StepTwo;