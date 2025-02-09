import React from "react";

const StepThree = ({ formData, handleChange, handleSubmit }) => {
    return (
        <>
            <div className='flex items-center justify-center'>
                <div className='bg-zinc-200 rounded-2xl p-8 w-full'>
                    <form className='mx-5 my-2.5' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-x-5'>
                            <div>
                                <label>Contract Status :</label>
                                <select
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                    type="text"
                                    id='contractStatus'
                                    name="contractStatus"
                                    value={formData.contractStatus}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    <option value="active">Active</option>
                                    <option value="deactive">Deactive</option>
                                    <option value="terminated">Terminated</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>Solution Description :</label>
                            <textarea
                                rows={5}
                                className='block w-full mt-1.5 rounded ps-2 pt-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                type="textarea"
                                name="solutionDescription"
                                value={formData.solutionDescription}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-3'>
                            <label>Remarks :</label>
                            <textarea
                                rows={5}
                                className='block w-full mt-1.5 rounded ps-2 pt-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                type="textarea"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
};

export default StepThree;