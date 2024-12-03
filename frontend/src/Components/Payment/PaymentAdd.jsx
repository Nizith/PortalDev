import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PaymentAdd({ handleCloseModal, tenderNumber, AMCCurrency, AMCterm }) {
    const [payData, setPayData] = useState({
        PRnumber: "",
        PRdate: "",
        LOIdetails: "",
        POnumber: "",
        POdate: "",
    });

    const [error, setError] = useState("");

    const maxEntries = {
        "Annually in advance": 1,
        "Annually in arrears": 1,
        "Monthly in arrears": 12,
        "Quarterly In Arrears": 4
    };

    const requiredEntries = maxEntries[AMCterm] || 1; // Default to 1 if term not recognized

    const [partialPay, setPartialPay] = useState([
        { InvoiceNumber: "", InvoiceDate: "", Paymentstatus: "", Paiddate: "", Paymentremarks: "" }
    ]);

    useEffect(() => {
        // Ensure at least one entry is always present
        if (partialPay.length < 1) {
            setPartialPay([
                { InvoiceNumber: "", InvoiceDate: "", Paymentstatus: "", Paiddate: "", Paymentremarks: "" }
            ]);
        } else if (partialPay.length > requiredEntries) {
            // Trim excess fields if AMC term requires fewer entries
            setPartialPay(partialPay.slice(0, requiredEntries));
        }
    }, [AMCterm]);



    const inputChange = (e) => {
        const { name, value } = e.target;
        setPayData((paydata) => ({
            ...paydata,
            [name]: value
        }));
    };

    const handlePartialPayChange = (index, e) => {
        const { name, value } = e.target;
        setPartialPay((prevPartialPay) =>
            prevPartialPay.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            )
        );
    };

    const addPartialPayField = () => {
        if (partialPay.length < requiredEntries) {
            setPartialPay([
                ...partialPay,
                { InvoiceNumber: "", InvoiceDate: "", Paymentstatus: "", Paiddate: "", Paymentremarks: "" }
            ]);
        } else {
            setError(`You can only add up to ${requiredEntries} entries for this AMC term.`);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check if the number of filled partialPay entries matches requiredEntries
        if (partialPay.length < requiredEntries) {
            setError(`Please add ${requiredEntries - partialPay.length} more payment details.`);
            return;
        }

        // Ensure all fields in each partialPay entry are filled
        const incompleteEntry = partialPay.some((entry) =>
            Object.values(entry).some((value) => !value)
        );

        if (incompleteEntry) {
            setError("Please fill all fields in each entry before submitting.");
            return;
        }

        try {
            const response = await axios.patch("http://localhost:4500/portaldev/createpayment", { ...payData, partialPay });
            console.log("Sent Payment Details: ", response.data);
            handleCloseModal();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="absolute inset-0 bg-transparent" onClick={handleCloseModal}></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-center text-2xl font-bold mb-6">Pay for "{tenderNumber}" Contract</h2>
                <form onSubmit={handleFormSubmit}>
                    {/* Static fields */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700">AMC Payment Term</label>
                            <input
                                type="text"
                                value={AMCterm}
                                className="w-full p-2 border border-gray-300 rounded"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">AMC Currency</label>
                            <input
                                type="text"
                                value={AMCCurrency}
                                className="w-full p-2 border border-gray-300 rounded"
                                readOnly
                            />
                        </div>
                    </div>


                    {/* Dynamic PartialPay Fields */}
                    {partialPay.map((entry, index) => (
                        <div className='border-2 border-gray-400 rounded-lg px-4 py-2 my-2'>
                            {AMCterm === 'Monthly in arrears' && (
                                <h1 className='text-indigo-600 font-semibold mb-3'>Pay for month {index + 1} </h1>
                            )}
                            {AMCterm === 'Quarterly In Arrears' && (
                                <h1 className='text-indigo-600 font-semibold mb-3'>Pay for quarter {index + 1} </h1>
                            )}
                            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700">Invoice Number</label>
                                    <input
                                        type="text"
                                        name="InvoiceNumber"
                                        value={entry.InvoiceNumber}
                                        onChange={(e) => handlePartialPayChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Invoice Date</label>
                                    <input
                                        type="date"
                                        name="InvoiceDate"
                                        value={entry.InvoiceDate}
                                        onChange={(e) => handlePartialPayChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Payment Status</label>
                                    <input
                                        type="text"
                                        name="Paymentstatus"
                                        value={entry.Paymentstatus}
                                        onChange={(e) => handlePartialPayChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Paid Date</label>
                                    <input
                                        type="date"
                                        name="Paiddate"
                                        value={entry.Paiddate}
                                        onChange={(e) => handlePartialPayChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className='col-span-4'>
                                    <label className="block text-gray-700">Payment Remarks</label>
                                    <input
                                        type="text"
                                        name="Paymentremarks"
                                        value={entry.Paymentremarks}
                                        onChange={(e) => handlePartialPayChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Button to add more partialPay fields */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={addPartialPayField}
                            className="text-indigo-600 font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Do More Payments
                        </button>
                    </div>

                    {/* Display any error messages */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Submit button */}
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="text-blue-200 font-semibold px-8 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
                        >
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
