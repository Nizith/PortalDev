import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { api } from '../../api';

export default function PaymentAdd({ handleCloseModal, tenderNo, AMCCurrency, AMCterm, AMCamount, AMCamountPeriod }) {
  const [payData, setPayData] = useState({
    PRnumber: "",
    PRdate: "",
    Paymentstatus: "",
    Paymentremarks: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${api}/Allpayments`);

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);

        console.log("Propped Period : ", AMCamountPeriod)
        const payments = response.data.data;

        const matchingPeriod = payments.find(payment => payment.AMCamountPeriod === AMCamountPeriod)
        if (matchingPeriod) {
          setIsPaymentDone(true)
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);
  const inputChange = (e) => {
    const { name, value } = e.target;
    setPayData((payData) => ({
      ...payData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isPaymentDone) {
      setError("Payment for this year has already been completed.");
      return;
    }

    const requiredFields = Object.entries(payData).filter(([key, value]) => !value.trim());
    if (requiredFields.length) {
      setError(`Missing fields: ${requiredFields.map(([key]) => key).join(", ")}`);
      return;
    }

    const requestData = {
      ...payData,
      tenderNo,
      AMCCurrency,
      AMCterm,
      AMCamount,
      AMCamountPeriod
    };

    console.log("Payload Sent:", requestData);

    try {
      const response = await axios.post(`${api}/createpayment`, requestData);
      console.log("Response:", response.data);
      toast.success("Payment Initiated");
      handleCloseModal();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Response Error:", error.response.data);
        setError(`Server Error: ${error.response.data.error || "Unknown issue"}`);
      } else if (error.request) {
        console.error("Request Error:", error.request);
        setError("No response from server. Check the backend.");
      } else {
        console.error("Error:", error.message);
        setError(`Unexpected error: ${error.message}`);
      }
    }
  };

  // Calculate the AMC amount based on the term
  const calculatedAmount = () => {
    const amount = parseFloat(AMCamount.toString().replace(/,/g, "")); // Parse and clean input
    if (isNaN(amount)) return "Invalid AMC Amount";

    switch (AMCterm.toLowerCase()) {
      case "monthly in arrears":
        return (amount / 12).toFixed(2);
      case "quarterly in arrears":
        return (amount / 4).toFixed(2);
      case "annually in arrears":
      case "annually in advance":
        return amount.toFixed(2);
      default:
        return "Unknown Term";
    }
  };

  return (
    <>

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="absolute inset-0 bg-transparent" onClick={handleCloseModal}></div>
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-1/2">
          <h2 className="w-full my-2 text-2xl font-bold mb-6 inline-flex justify-center">
            PR for <p className="text-indigo-600 mx-2">"{tenderNo}"</p> Contract
          </h2>
          {loading ? (
            <>
              <div className="flex justify-center items-center">
                <div className="w-10 h-10 border-[6px] border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            <>
              {isPaymentDone ? (
                <div className="flex justify-center items-center text-green-500 gap-x-3 mb-2">
                  <p className="text-xl font-semibold text-center justify-center items-center">
                    You have already completed the payment for this
                    {(() => {
                      switch (AMCterm.toLowerCase()) {
                        case "monthly in arrears":
                          return " month";
                        case "quarterly in arrears":
                          return " quater";
                        case "annually in arrears":
                        case "annually in advance":
                          return " year";
                        default:
                          return "Unknown Term";
                      }
                    })()}.
                  </p>
                  <IoCheckmarkDoneCircle size={25} />
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {/* Static fields */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
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
                    <div>
                      <label className="block text-gray-700">AMC Amount</label>
                      <input
                        type="text"
                        value={calculatedAmount()}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Full attributes */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700">PR Number</label>
                      <input
                        type="text"
                        name="PRnumber"
                        value={payData.PRnumber}
                        onChange={inputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">PR Date</label>
                      <input
                        type="date"
                        name="PRdate"
                        value={payData.PRdate}
                        onChange={inputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Payment Status</label>
                      <select
                        name="Paymentstatus"
                        value={payData.Paymentstatus}
                        onChange={inputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value=""></option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-gray-700">Payment Remarks</label>
                      <textarea
                        rows={3}
                        name="Paymentremarks"
                        value={payData.Paymentremarks}
                        onChange={inputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="submit"
                      className={`text-blue-200 font-semibold px-8 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200 ${isPaymentDone ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isPaymentDone}
                    >
                      Submit Payment
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
