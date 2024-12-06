import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import LoadingAnimation from "../Login/LoadingAnimation";
import { IoIosArrowForward } from "react-icons/io";

const initialInputFields = {
  PRnumber: "",
  PRdate: null,
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
  const [loading, setLoading] = useState(true);

  // Fetch user role from localStorage
  const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage.

  // Fetch all payments from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/Allpayments");

        // Simulate minimum 2-second loading time
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));

        // Wait for both data fetch and 2 seconds delay
        await Promise.all([delay, response]);

        console.log("Payment Data : ", response.data)

        setPayments(response.data.data);
        setFilteredPayments(response.data.data); // Set both payments and filteredPayments
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false); // Stop the loading animation after both conditions are met
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
        toast.success("Updated Successfully!");
      } else {
        const response = await axios.post("http://localhost:4500/portaldev/createpayment", inputFields);

        // Add the new payment to the state
        setPayments((prevPayments) => [...prevPayments, response.data.data]);
        setFilteredPayments((prevPayments) => [...prevPayments, response.data.data]);
      }
      // Close the modal and reset the form fields

      handleCloseModal();
      //window.location.reload()
    } catch (error) {
      toast.error("Updated Failed!");
      console.error("Error submitting form:", error);
    }
  };

  const handleDeletePayment = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
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
      <Toaster />
      {loading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <div className="float-right w-full min-h-screen">
          <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
            <IoIosArrowForward />{userRole === 'Admin' ? 'Manage Payments' : 'View Payments'}
          </h2>
          <div className="mx-8 my-5">
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                name="PRnumber"
                placeholder="Filter by PR Number"
                value={filterData.PRnumber}
                onChange={handleFilterChange}
                className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
              />
              <input
                type="text"
                name="POnumber"
                placeholder="Filter by PO Number"
                value={filterData.POnumber}
                onChange={handleFilterChange}
                className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
              />
              {userRole === 'Admin' && (
                <button
                  className="bg-green-800 hover:ring-2 ring-green-500 text-green-200 font-semibold px-5 py-2 rounded-lg duration-200"
                  onClick={() => handleOpenModal()}
                >
                  New
                </button>
              )}
            </div>
            <table className="min-w-full table-auto border border-collapse bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                  <th className="py-3 px-4 font-bold uppercase border">PR number</th>
                  <th className="py-3 px-4 font-bold uppercase border">PR Date</th>
                  <th className="py-3 px-4 font-bold uppercase border">LOI Details</th>
                  <th className="py-3 px-4 font-bold uppercase border">PO number</th>
                  <th className="py-3 px-4 font-bold uppercase border">PO Date</th>
                  <th className="py-3 px-4 font-bold uppercase border">Invoice Number</th>
                  <th className="py-3 px-4 font-bold uppercase border">Invoice Date</th>
                  <th className="py-3 px-4 font-bold uppercase border">Payment Status</th>
                  <th className="py-3 px-4 font-bold uppercase border">Paid Date</th>
                  <th className="py-3 px-4 font-bold uppercase border">Payment Remarks</th>
                  {userRole === 'Admin' && (
                    <th className="py-3 px-4 font-bold uppercase border">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-all duration-300 ease-in-out">
                      <td className="py-2 px-2 font-semibold border">{payment.PRnumber}</td>
                      <td className="py-2 px-2 font-semibold border">{new Date(payment.PRdate).toLocaleDateString()}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.LOIdetails}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.POnumber}</td>
                      <td className="py-2 px-2 font-semibold border">{new Date(payment.POdate).toLocaleDateString()}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.InvoiceNumber}</td>
                      <td className="py-2 px-2 font-semibold border">{new Date(payment.InvoiceDate).toLocaleDateString()}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.Paymentstatus}</td>
                      <td className="py-2 px-2 font-semibold border">{new Date(payment.Paiddate).toLocaleDateString()}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.Paymentremarks}</td>
                      {userRole === 'Admin' && (
                        <td className="py-2 px-2 font-semibold border text-center space-x-6">
                          <button onClick={() => handleOpenModal(payment)} >
                            <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                          </button>
                          <button onClick={() => handleDeletePayment(payment._id)} >
                            <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                          </button>
                        </td>
                      )}
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



            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
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
                        type="submit"
                        className="text-blue-200 font-semibold px-5 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
                      >
                        {isEditMode ? "Update" : "Create"}
                      </button>
                      <button
                        type="button"
                        className="text-gray-200 font-semibold px-5 py-2 rounded-lg bg-gray-500 hover:ring-2 ring-gray-500 duration-200"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
