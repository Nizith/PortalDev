import React, { useState } from "react";
import axios from "axios";

export default function PaymentAdd({ handleCloseModal, tenderNumber, AMCCurrency, AMCterm }) {
  const [payData, setPayData] = useState({
    InvoiceNumber: "",
    InvoiceDate: "",
    Paymentstatus: "",
    Paiddate: "",
    Paymentremarks: "",
  });

  const [error, setError] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setPayData((payData) => ({
      ...payData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const incompleteField = Object.values(payData).some((value) => !value);
    if (incompleteField) {
      setError("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4500/portaldev/createpayment", payData);
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
        <h2 className="text-center text-2xl font-bold mb-6">
          Pay for "{tenderNumber}" Contract
        </h2>
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

          {/* Full attributes */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700">Invoice Number</label>
              <input
                type="text"
                name="InvoiceNumber"
                value={payData.InvoiceNumber}
                onChange={inputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Invoice Date</label>
              <input
                type="date"
                name="InvoiceDate"
                value={payData.InvoiceDate}
                onChange={inputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Payment Status</label>
              <input
                type="text"
                name="Paymentstatus"
                value={payData.Paymentstatus}
                onChange={inputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Paid Date</label>
              <input
                type="date"
                name="Paiddate"
                value={payData.Paiddate}
                onChange={inputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Payment Remarks</label>
              <input
                type="text"
                name="Paymentremarks"
                value={payData.Paymentremarks}
                onChange={inputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Display any error messages */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit button */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="submit"
              className="text-blue-200 font-semibold px-8 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
