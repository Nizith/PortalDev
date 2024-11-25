import React from "react";
import { IoMdAdd, IoMdRemove, IoIosWarning } from 'react-icons/io';

const StepFour = ({ formData, handleAMCDetailsChange, handleAddAMCDetail, handleDeleteAMCDetail, handleSubmit }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="py-2.5 mx-4 border border-neutral-500 bg-zinc-200 rounded-2xl w-full max-w-4xl">
                <form className="m-6 space-y-8" onSubmit={handleSubmit}>
                    {formData.AMCDetails.map((detail, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                            {/* Payment Term and Currency */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Payment Term:</label>
                                    <input
                                        className="w-full h-10 rounded border border-gray-400 px-2 mt-1 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                        type="text"
                                        name={`AMCpaymentterms${index}`}
                                        value={detail.AMCpaymentterms}
                                        onChange={(e) => handleAMCDetailsChange(index, 'AMCpaymentterms', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Currency:</label>
                                    <input
                                        className="w-full h-10 rounded border border-gray-400 px-2 mt-1 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                        type="text"
                                        name={`AMCcurrency${index}`}
                                        value={detail.AMCcurrency}
                                        onChange={(e) => handleAMCDetailsChange(index, 'AMCcurrency', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Amount Section */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount:</label>
                                <div className="grid grid-cols-5 gap-4">
                                    {detail.AMCamount.map((amount, amtIndex) => (
                                        <div key={amtIndex} className="flex flex-col items-center">
                                            <button
                                                onClick={(b) => b.preventDefault()}
                                                className="bg-indigo-700 text-white text-sm px-4 py-1 rounded-md mb-2"
                                            >
                                                Year {amtIndex + 1}
                                            </button>
                                            <input
                                                className="w-full h-10 rounded border border-gray-400 px-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                                type="text"
                                                name={`AMCamount${index}${amtIndex}`}
                                                value={amount}
                                                onChange={(e) => {
                                                    const newAmounts = [...detail.AMCamount];
                                                    newAmounts[amtIndex] = e.target.value;
                                                    handleAMCDetailsChange(index, 'AMCamount', newAmounts);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Description */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Payment Description:</label>
                                <textarea
                                    rows={2}
                                    className="w-full rounded border border-gray-400 px-2 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                    name={`paymentDescription${index}`}
                                    value={formData.paymentDescription}
                                    onChange={(e) => handleAMCDetailsChange(index, 'paymentDescription', e.target.value)}
                                />
                            </div>

                            {/* Add/Remove Buttons */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    className={`w-full flex justify-center items-center bg-blue-800 hover:ring-2 ring-blue-500 text-blue-200 duration-300 px-8 py-2 rounded-lg font-semibold ${
                                        formData.AMCDetails.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={formData.AMCDetails.length >= 4}
                                    onClick={handleAddAMCDetail}
                                >
                                    <IoMdAdd className="mr-1 size-6" />
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-center items-center bg-red-800 hover:ring-2 ring-red-600 text-red-200 duration-300 px-5 py-2 rounded-lg font-semibold ${
                                        formData.AMCDetails.length === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={formData.AMCDetails.length === 1}
                                    onClick={() => handleDeleteAMCDetail(index)}
                                >
                                    <IoMdRemove className="mr-1 size-6" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Warning for Maximum Limit */}
                    {formData.AMCDetails.length >= 4 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex items-center space-x-4">
                            <IoIosWarning className="text-2xl" />
                            <p className="text-sm">You can only add up to 4 forms!</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default StepFour;
