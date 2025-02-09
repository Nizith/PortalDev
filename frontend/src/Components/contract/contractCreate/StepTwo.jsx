import React, { useMemo } from "react";

const StepTwo = ({ formData, handleChange, coordinators, handleSubmit }) => {
    // Function to remove duplicates based on a key
    const removeDuplicates = (array, key) => {
        return [...new Map(array.map(item => [item[key], item])).values()];
    };

    // Filtering and removing duplicates for Sales Team
    const filteredSalesTeam = useMemo(() => {
        const filtered = coordinators.data?.filter(coordinator => coordinator.SalesCategory === formData.salesTeam) || [];
        return {
            accountManagers: removeDuplicates(filtered, "AccountManager"),
            managers: removeDuplicates(filtered, "Manager")
        };
    }, [formData.salesTeam, coordinators]);

    // Filtering and removing duplicates for Solution Team
    const filteredSolutionTeam = useMemo(() => {
        const filtered = coordinators.data?.filter(coordinator => coordinator.SolutionCategory === formData.solutionTeam) || [];
        return {
            salesEngineers: removeDuplicates(filtered, "SalesEngineer"),
            solutionEngineers: removeDuplicates(filtered, "SolutionEngineer")
        };
    }, [formData.solutionTeam, coordinators]);

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className='bg-zinc-200 rounded-2xl p-8 w-full '>
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
                                            <label>Account Manager :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="accountManager"
                                                name="accountManager"
                                                value={formData.accountManager}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {filteredSalesTeam.accountManagers.map(coordinator => (
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
                                                {filteredSalesTeam.managers.map(coordinator => (
                                                    <option key={coordinator._id} value={coordinator.Manager}>{coordinator.Manager}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
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
                                            <label>Sales Engineer :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="salesEngineer"
                                                name="salesEngineer"
                                                value={formData.salesEngineer}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {filteredSolutionTeam.salesEngineers.map(coordinator => (
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
                                                {filteredSolutionTeam.solutionEngineers.map(coordinator => (
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
};

export default StepTwo;
