import React from "react";

const StepFive = ({ formData, handleSubmit }) => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="py-2.5 mx-4 border border-neutral-500 bg-zinc-200 rounded-2xl w-full max-w-4xl">
                    <div className="m-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Render general fields except Solution Description */}
                            {Object.entries(formData).map(([key, value]) => {
                                // Skip Solution Description to render it separately
                                if (key === "solutionDescription") return null;

                                // Handle AMCDetails array separately
                                if (key === "AMCDetails" && Array.isArray(value)) {
                                    return (
                                        <div key={key} className="col-span-2">
                                            <label className="block mb-1 font-medium">
                                                AMC Details:
                                            </label>
                                            {value.map((detail, index) => (
                                                <div key={index} className="mb-2">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-sm">AMC Amount:</label>
                                                            <input
                                                                type="text"
                                                                value={detail.AMCamount || ""}
                                                                className="block w-full mt-1 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-indigo-600"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm">AMC Currency:</label>
                                                            <input
                                                                type="text"
                                                                value={detail.AMCcurrency || ""}
                                                                className="block w-full mt-1 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-indigo-600"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }

                                // Render all other fields
                                return (
                                    <div key={key}>
                                        <label htmlFor={key} className="block">
                                            {key.replace(/([A-Z])/g, " $1")}: {/* Format key */}
                                        </label>
                                        <input
                                            id={key}
                                            className="block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-indigo-600"
                                            type="text"
                                            value={value || ""}
                                            readOnly
                                        />
                                    </div>
                                );
                            })}

                            {/* Render Payment Description explicitly */}
                            <div>
                                <label htmlFor="paymentDescription" className="block">
                                    Payment Description:
                                </label>
                                <input
                                    id="paymentDescription"
                                    className="block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-indigo-600"
                                    type="text"
                                    value={formData.paymentDescription}
                                    readOnly
                                />
                            </div>

                            {/* Render AMC Payment Terms explicitly */}
                            <div>
                                <label htmlFor="AMCpaymentterms" className="block">
                                    AMC Payment Terms:
                                </label>
                                <input
                                    id="AMCpaymentterms"
                                    className="block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-indigo-600"
                                    type="text"
                                    value={formData.AMCpaymentterms}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Solution Description - Rendered Separately */}
                        <div className="mt-6">
                            <label htmlFor="solutionDescription" className="block font-medium">
                                Solution Description:
                            </label>
                            <textarea
                                id="solutionDescription"
                                className="block w-full mt-2 h-32 rounded ps-2 border border-gray-400 focus:outline-none focus:border-indigo-600"
                                value={formData.solutionDescription || ""}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepFive;
