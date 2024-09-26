import React, { useState, useEffect } from "react";
import axios from "axios";

const initialInputFields = {
  PRnumber: "",
  PRdate: "",
  LOIdetails: "",
  POnumber: "",
  POdate: "",
  InvoiceNumber: "",
  InvoiceDate: "",
  Paymentstatus: "",
  Paiddate: "",
  Paymentremarks: "",
  AMCpaymentterms: "",
  AMCcurrency: "",
  AMCamount: ""
};

export default function PaymentTable() {
  const [payments, setPayments] = useState([]);
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Fetch all payments from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/Allpayments");
        setPayments(response.data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  // Populate the form fields when selectedPayment changes
  useEffect(() => {
    if (selectedPayment) {
      setInputFields({
        PRnumber: selectedPayment.PRnumber || "",
        PRdate: selectedPayment.PRdate ? new Date(selectedPayment.PRdate).toISOString().split("T")[0] : "",
        LOIdetails: selectedPayment.LOIdetails || "",
        POnumber: selectedPayment.POnumber || "",
        POdate: selectedPayment.POdate ? new Date(selectedPayment.POdate).toISOString().split("T")[0] : "",
        InvoiceNumber: selectedPayment.InvoiceNumber || "",
        InvoiceDate: selectedPayment.InvoiceDate ? new Date(selectedPayment.InvoiceDate).toISOString().split("T")[0] : "",
        Paymentstatus: selectedPayment.Paymentstatus || "",
        Paiddate: selectedPayment.Paiddate ? new Date(selectedPayment.Paiddate).toISOString().split("T")[0] : "",
        Paymentremarks: selectedPayment.Paymentremarks || "",
        AMCpaymentterms: selectedPayment.AMCpaymentterms || "",
        AMCcurrency: selectedPayment.AMCcurrency || "",
        AMCamount: selectedPayment.AMCamount || ""
      });
    } else {
      setInputFields(initialInputFields); // reset to initial state if no payment is selected
    }
  }, [selectedPayment]);

  const handleOpenModal = (payment = null) => {
    if (payment) {
      setIsEditMode(true);
      setSelectedPayment(payment);
    } else {
      setIsEditMode(false);
      setInputFields(initialInputFields);
      setSelectedPayment(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputFields(initialInputFields);
  };

  const handleInputChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const response = await axios.put(
          `http://localhost:4500/portaldev/updatepayments/${selectedPayment._id}`,
          inputFields
        );
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === selectedPayment._id ? response.data.data : payment
          )
        );
      } else {
        const response = await axios.post("http://localhost:4500/portaldev/createpayment", inputFields);
        setPayments((prevPayments) => [...prevPayments, response.data.data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4500/portaldev/deletepayment/${id}`);
      if (response.status === 200) {
        setPayments((prevPayments) =>
          prevPayments.filter((payment) => payment._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting payment:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <h2 className="text-center text-black">Payment Table</h2>
        <div className="mx-8">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 mb-4"
            onClick={() => handleOpenModal()}
          >
            New Payment
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="py-2 px-4 border-b">PR number</th>
                  <th className="py-2 px-4 border-b">PR Date</th>
                  <th className="py-2 px-4 border-b">LOI Details</th>
                  <th className="py-2 px-4 border-b">PO number</th>
                  <th className="py-2 px-4 border-b">PO Date</th>
                  <th className="py-2 px-4 border-b">Invoice Number</th>
                  <th className="py-2 px-4 border-b">Invoice Date</th>
                  <th className="py-2 px-4 border-b">Payment Status</th>
                  <th className="py-2 px-4 border-b">Paid Date</th>
                  <th className="py-2 px-4 border-b">Payment Remarks</th>
                  <th className="py-2 px-4 border-b">AMC Payment Terms</th>
                  <th className="py-2 px-4 border-b">AMC Currency</th>
                  <th className="py-2 px-4 border-b">AMC Amount</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={index} className={`bg-${index % 2 === 0 ? "blue-50" : "white"}`}>
                      <td className="py-2 px-4 border-b">{payment.PRnumber}</td>
                      <td className="py-2 px-4 border-b">{new Date(payment.PRdate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{payment.LOIdetails}</td>
                      <td className="py-2 px-4 border-b">{payment.POnumber}</td>
                      <td className="py-2 px-4 border-b">{new Date(payment.POdate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{payment.InvoiceNumber}</td>
                      <td className="py-2 px-4 border-b">{new Date(payment.InvoiceDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{payment.Paymentstatus}</td>
                      <td className="py-2 px-4 border-b">{new Date(payment.Paiddate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{payment.Paymentremarks}</td>
                      <td className="py-2 px-4 border-b">{payment.AMCpaymentterms}</td>
                      <td className="py-2 px-4 border-b">{payment.AMCcurrency}</td>
                      <td className="py-2 px-4 border-b">{payment.AMCamount}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                          onClick={() => handleOpenModal(payment)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                          onClick={() => handleDeletePayment(payment._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="py-2 px-4 border text-center">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal for Add/Edit Payment */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  {isEditMode ? "Edit Payment" : "Add Payment"}
                </h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                    {Object.keys(initialInputFields).map((field, index) => (
                      <div key={index} className="mb-4">
                        <label className="block text-gray-700">{field}:</label>
                        <input
                          type={field.includes("date") ? "date" : "text"}
                          name={field}
                          value={inputFields[field]}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {isEditMode ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
