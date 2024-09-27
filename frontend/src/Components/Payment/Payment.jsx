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
  Paymentremarks: ""
};

export default function PaymentTable() {
  const [payments, setPayments] = useState([]);
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filterData, setFilterData] = useState({
    PRnumber: "",
    POnumber: "",
  });

  // Fetch all payments from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/Allpayments");
        setPayments(response.data.data);
        setFilteredPayments(response.data.data); // Set both payments and filteredPayments
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
        Paymentremarks: selectedPayment.Paymentremarks || ""
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((preFilterData) => ({
      ...preFilterData,
      [name]: value,
    }));

    if (value === "") {
      // Reset to the full payments list if the filter is cleared
      setFilteredPayments(payments);
    } else {
      // Apply filter immediately when input changes
      handleFilterSubmit({ ...filterData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const response = await axios.put(
          `http://localhost:4500/portaldev/updatepayments/${selectedPayment._id}`,
          inputFields
        );

        // Immediately update the payment in the state
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === selectedPayment._id ? response.data.data : payment
          )
        );
        setFilteredPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === selectedPayment._id ? response.data.data : payment
          )
        );
      } else {
        const response = await axios.post("http://localhost:4500/portaldev/createpayment", inputFields);

        // Add the new payment to the state
        setPayments((prevPayments) => [...prevPayments, response.data.data]);
        setFilteredPayments((prevPayments) => [...prevPayments, response.data.data]);
      }
      // Close the modal and reset the form fields

      handleCloseModal();
      window.location.reload()
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
        setFilteredPayments((prevPayments) =>
          prevPayments.filter((payment) => payment._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting payment:", error.response ? error.response.data : error.message);
    }
  };

  const handleFilterSubmit = (currentFilterData = filterData) => {
    const filtered = payments.filter((payment) => {
      return (
        (currentFilterData.PRnumber === "" ||
          payment.PRnumber.toString().toLowerCase().includes(currentFilterData.PRnumber.toLowerCase())) &&
        (currentFilterData.POnumber === "" ||
          payment.POnumber.toString().toLowerCase().includes(currentFilterData.POnumber.toLowerCase()))
      );
    });
    setFilteredPayments(filtered);
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <h2 className="text-center text-black">Payment Table</h2>
        <div className="mx-8">
          <div>
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                name="PRnumber"
                placeholder="Filter by PR Number"
                value={filterData.PRnumber}
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="POnumber"
                placeholder="Filter by PO Number"
                value={filterData.POnumber}
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />

              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 mb-4"
                onClick={() => handleOpenModal()}
              >
                New
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 ">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 border">PR number</th>
                  <th className="py-2 px-4 border">PR Date</th>
                  <th className="py-2 px-4 border">LOI Details</th>
                  <th className="py-2 px-4 border">PO number</th>
                  <th className="py-2 px-4 border">PO Date</th>
                  <th className="py-2 px-4 border">Invoice Number</th>
                  <th className="py-2 px-4 border">Invoice Date</th>
                  <th className="py-2 px-4 border">Payment Status</th>
                  <th className="py-2 px-4 border">Paid Date</th>
                  <th className="py-2 px-4 border">Payment Remarks</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => (
                    <tr key={index} className={`bg-${index % 2 === 0 ? "blue-50" : "white"}`}>
                      <td className="py-2 px-4 border">{payment.PRnumber}</td>
                      <td className="py-2 px-4 border">{new Date(payment.PRdate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border">{payment.LOIdetails}</td>
                      <td className="py-2 px-4 border">{payment.POnumber}</td>
                      <td className="py-2 px-4 border">{new Date(payment.POdate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border">{payment.InvoiceNumber}</td>
                      <td className="py-2 px-4 border">{new Date(payment.InvoiceDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border">{payment.Paymentstatus}</td>
                      <td className="py-2 px-4 border">{new Date(payment.Paiddate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border">{payment.Paymentremarks}</td>
                      <td className="py-2 px-4 border inline-flex">
                        <button
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                          onClick={() => handleOpenModal(payment)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                          onClick={() => handleDeletePayment(payment._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="py-4 text-center">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-3xl h-3/4 overflow-y-auto">
            <h2 className="text-center text-xl font-bold mb-4">
              {isEditMode ? "Edit Payment" : "Create Payment"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              {/* First section of the form */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700">PR Number</label>
                  <input
                    type="text"
                    name="PRnumber"
                    value={inputFields.PRnumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">PR Date</label>
                  <input
                    type="date"
                    name="PRdate"
                    value={inputFields.PRdate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">LOI Details</label>
                  <input
                    type="text"
                    name="LOIdetails"
                    value={inputFields.LOIdetails}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">PO Number</label>
                  <input
                    type="text"
                    name="POnumber"
                    value={inputFields.POnumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">PO Date</label>
                  <input
                    type="date"
                    name="POdate"
                    value={inputFields.POdate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Invoice Number</label>
                  <input
                    type="text"
                    name="InvoiceNumber"
                    value={inputFields.InvoiceNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Second section of the form */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700">Invoice Date</label>
                  <input
                    type="date"
                    name="InvoiceDate"
                    value={inputFields.InvoiceDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Payment Status</label>
                  <input
                    type="text"
                    name="Paymentstatus"
                    value={inputFields.Paymentstatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Paid Date</label>
                  <input
                    type="date"
                    name="Paiddate"
                    value={inputFields.Paiddate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Payment Remarks</label>
                  <input
                    type="text"
                    name="Paymentremarks"
                    value={inputFields.Paymentremarks}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
