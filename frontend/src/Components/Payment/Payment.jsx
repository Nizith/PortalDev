import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { TbExternalLink } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import LoadingAnimation from "../Login/LoadingAnimation";
import ContractDatesGraph from "../Graphs/ContractDatesGraph";
import { api } from '../../api';

const initialInputFields = {
  tenderNo: "",
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

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [viewDetailsRow, setViewDetailsRow] = useState(null);
  const [editedPayment, setEditedPayment] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    PRnumber: "",
    POnumber: "",
  });
  const [filteredPayments, setFilteredPayments] = useState([]);

  const userRole = localStorage.getItem('role');

  // Function to get the token from local storage or any other storage
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${api}/Allpayments`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);
        setPayments(response.data.data);
        setFilteredPayments(response.data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleViewDetailsClick = (payment) => {
    setViewDetailsRow(payment._id);
    setEditedPayment(payment);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e, field) => {
    setEditedPayment({ ...editedPayment, [field]: e.target.value });
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await axios.put(
        `${api}/updatepayments/${id}`,
        editedPayment,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setPayments(payments.map((payment) =>
        payment._id === id ? response.data.data : payment
      ));
      setFilteredPayments(filteredPayments.map((payment) =>
        payment._id === id ? response.data.data : payment
      ));
      toast.success("Updated successfully!");
      setViewDetailsRow(null);
      setEditedPayment({});
    } catch (error) {
      toast.error("Update Failed!");
      console.error("Error updating payment:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`${api}/deletepayment/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setPayments(payments.filter((payment) => payment._id !== id));
        setFilteredPayments(filteredPayments.filter((payment) => payment._id !== id));
        setViewDetailsRow(null);
        setEditedPayment({});
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData(prev => ({ ...prev, [name]: value }));

    const filtered = payments.filter(payment => {
      return (!value ||
        payment[name].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredPayments(filtered);
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <LoadingAnimation />
      ) : (
      <div className="float-right w-full min-h-screen">
        <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
          <IoIosArrowForward /> {userRole === 'Admin' ? 'Manage Payments' : 'View Payments'}
        </h2>

        {!viewDetailsRow ? (
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
            </div>

              <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                    <th className="py-3 px-4 font-bold uppercase border">Tender number</th>
                    <th className="py-3 px-4 font-bold uppercase border">PR number</th>
                    <th className="py-3 px-4 font-bold uppercase border">PR Date</th>
                    <th className="py-3 px-4 font-bold uppercase border">Payment Status</th>
                    <th className="py-3 px-4 font-bold uppercase border">Payment Remarks</th>
                    <th className="py-3 px-4 font-bold uppercase border">View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment, index) => (
                    <tr key={payment._id}
                      className={`${index % 2 === 0 ? "bg-white bg-opacity-80" : "bg-gray-50"} 
                                    hover:bg-gradient-to-r hover:from-blue-50 hover:via-gray-50 hover:to-blue-50 
                                    transition-all duration-300 ease-in-out`}>
                      <td className="py-2 px-2 font-semibold border">{payment.tenderNo}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.PRnumber}</td>
                      <td className="py-2 px-2 font-semibold border">{new Date(payment.PRdate).toLocaleDateString()}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.Paymentstatus}</td>
                      <td className="py-2 px-2 font-semibold border">{payment.Paymentremarks}</td>
                      <td className="py-3 px-2 text-center border">
                        <button onClick={() => handleViewDetailsClick(payment)}
                          className="text-indigo-500 hover:text-indigo-600 text-3xl rounded-lg transform hover:scale-105 transition-all">
                          <TbExternalLink />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
          </div>
        ) : (
          <div className="p-5 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSaveClick(viewDetailsRow)}
                      className="bg-green-800 hover:ring-2 ring-green-600 text-green-200 font-semibold px-5 py-2 rounded-lg duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-red-800 hover:ring-2 ring-red-600 text-red-100 font-semibold px-4 py-2 rounded-lg flex items-center"
                    >
                      <IoMdClose className="size-6 mr-2" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setViewDetailsRow(null)}
                    className="bg-gray-800 hover:ring-2 ring-gray-500 text-gray-200 font-semibold px-5 py-2 rounded-lg duration-200"
                  >
                    Back to List
                  </button>
                )}
              </div>
              {userRole === 'Admin' && (
                <div className="inline-flex space-x-5">
                  <button
                    onClick={handleEditClick}
                    className="bg-indigo-800 hover:ring-2 ring-indigo-600 text-indigo-100 font-semibold px-4 py-2 rounded-lg flex items-center duration-200"
                  >
                    <FaEdit className="mr-2" />Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(viewDetailsRow)}
                    className="bg-red-800 hover:ring-2 ring-red-600 text-red-200 font-semibold px-5 py-2 rounded-lg duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center">
              <ContractDatesGraph
                PRdate={editedPayment.PRdate}
                POdate={editedPayment.POdate}
                InvoiceDate={editedPayment.InvoiceDate}
                Paiddate={editedPayment.Paiddate}
              />
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">PR Number:</label>
                  <input
                    type="text"
                    value={editedPayment.PRnumber || "-"}
                    onChange={(e) => handleInputChange(e, "PRnumber")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">PR Date:</label>
                  <input
                    type="date"
                    value={editedPayment.PRdate?.split('T')[0] || "-"}
                    onChange={(e) => handleInputChange(e, "PRdate")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">LOI Details:</label>
                  <input
                    type="text"
                    value={editedPayment.LOIdetails || "-"}
                    onChange={(e) => handleInputChange(e, "LOIdetails")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">PO Number:</label>
                  <input
                    type="text"
                    value={editedPayment.POnumber || "-"}
                    onChange={(e) => handleInputChange(e, "POnumber")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Payment Status:</label>
                  <input
                    type="text"
                    value={editedPayment.Paymentstatus || "-"}
                    onChange={(e) => handleInputChange(e, "Paymentstatus")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Payment Remarks:</label>
                  <input
                    type="text"
                    value={editedPayment.Paymentremarks || "-"}
                    onChange={(e) => handleInputChange(e, "Paymentremarks")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">PO Date</label>
                  <input
                    type="text"
                    value={editedPayment.POdate || "-"}
                    onChange={(e) => handleInputChange(e, "POdate")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={editedPayment.InvoiceNumber || "-"}
                    onChange={(e) => handleInputChange(e, "InvoiceNumber")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Invoice Date</label>
                  <input
                    type="text"
                    value={editedPayment.InvoiceDate || "-"}
                    onChange={(e) => handleInputChange(e, "InvoiceDate")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Paid Date</label>
                  <input
                    type="text"
                    value={editedPayment.Paiddate || "-"}
                    onChange={(e) => handleInputChange(e, "Paiddate")}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
       )}
    </>
  );
}