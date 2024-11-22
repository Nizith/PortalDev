import React from "react";

const StepFive = ({ formData, editCurrent, handleSubmit }) => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className='py-2.5 mx-4 border border-neutral-500 bg-zinc-200 rounded-2xl w-full max-w-4xl'>
                    <div className='m-6 '>
                        <div className='grid grid-cols-2 gap-x-5 gap-y-2'>
                            <div>
                                <label htmlFor="">Supplier :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.supplier}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.customer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">AccountManager :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.accountManager}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Manager :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.manager}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Sales Engineer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.salesEngineer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Solution Engineer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.solutionEngineer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Tender No :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.tenderNo}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer Contract Start Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.customerContStartDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer Contract End Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.customerContEndDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Supplier Contract Start Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.supplierContStartDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Supplier Contract End Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.supplierContEndDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Solution Description :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.solutionDescription}
                                    disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StepFive;