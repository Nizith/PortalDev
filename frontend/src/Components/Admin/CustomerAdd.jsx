import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import LoadingAnimation from "../Login/LoadingAnimation";
import { IoIosArrowForward } from "react-icons/io";
import { api } from '../../api';

const initialInputFields = {
  BRnumber: "",
  name: "",
  email: "",
  contact: "",
};

// Function to get the token from local storage
const getToken = () => localStorage.getItem('token');

export default function customerTable() {
  const [customer, setCustomer] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role from localStorage
  const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage.

  // Fetch all customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${api}/readcustomer`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);

        const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by createdAt
        setCustomer(sortedData); // Set sorted data
        setFilteredCustomer(sortedData); // Set filtered customers to sorted data initially
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false); // Stop the loading animation after both conditions are met
      }
    };

    fetchCustomers();
  }, []);

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setIsEditMode(true);
      setInputFields(customer);
    } else {
      setIsEditMode(false);
      setInputFields(initialInputFields);
    }
    setSelectedCustomer(customer);
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
        // Edit customer logic
        const response = await axios.put(
          `${api}/updateCustomer/${selectedCustomer._id}`,
          inputFields,
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          }
        );

        const updatedCustomer = response.data.data;
        setCustomer((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.BRnumber === selectedCustomer.BRnumber ? updatedCustomer : customer
          )
        );
        setFilteredCustomer((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.BRnumber === selectedCustomer.BRnumber ? updatedCustomer : customer
          )
        );
        toast.success("Updated Successfully!");
      } else {
        // Add new customer logic
        const response = await axios.post(
          `${api}/createcustomer`,
          inputFields,
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          }
        );

        const newCustomer = response.data.data;
        setCustomer((prevCustomers) => [newCustomer, ...prevCustomers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setFilteredCustomer((prevCustomers) => [newCustomer, ...prevCustomers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }

      handleCloseModal();
    } catch (error) {
      toast.error("Updated Failed!");
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteCustomer = async (BRnumber, id) => {
    if (window.confirm('Are you sure you want to delete this cutomer?')) {
      try {
        await axios.delete(`${api}/deletecustomer/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setCustomer((prevCustomers) =>
          prevCustomers.filter((customer) => customer.BRnumber !== BRnumber).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        setFilteredCustomer((prevCustomers) =>
          prevCustomers.filter((customer) => customer.BRnumber !== BRnumber).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.error("Error deleting customer:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilteredCustomer(
      customer.filter((customer) =>
        customer[name].toLowerCase().includes(value.toLowerCase())
      ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
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
            <IoIosArrowForward />{userRole === 'Admin' ? 'Manage Customers' : 'View Customers'}
          </h2>
          <div className="mx-8 mt-5">
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                name="BRnumber"
                placeholder="Filter by BR number"
                onChange={handleFilterChange}
                className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
              />
              <input
                type="text"
                name="name"
                placeholder="Filter by Name"
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
                  <th className="py-3 px-4 font-bold uppercase border">BR number</th>
                  <th className="py-3 px-4 font-bold uppercase border">Name</th>
                  <th className="py-3 px-4 font-bold uppercase border">Email</th>
                  <th className="py-3 px-4 font-bold uppercase border">Contact</th>
                  {userRole === 'Admin' && (
                    <th className="py-3 px-4 font-bold uppercase border">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredCustomer.length > 0 ? (
                  filteredCustomer.map((customer, index) => (
                    <tr key={index}>
                      <td className="py-2 px-2 font-semibold border">{customer.BRnumber}</td>
                      <td className="py-2 px-2 font-semibold border">{customer.name}</td>
                      <td className="py-2 px-2 font-semibold border">{customer.email}</td>
                      <td className="py-2 px-2 font-semibold border">{customer.contact}</td>
                      {userRole === 'Admin' && (
                        <td className="py-2 font-semibold border flex justify-center gap-x-8">
                          <button onClick={() => handleOpenModal(customer)}>
                            <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                          </button>
                          <button onClick={() => handleDeleteCustomer(customer.BRnumber, customer._id)}>
                            <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 border text-center">
                      No customer found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

            {/* Modal for Add/Edit customer */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-xl font-bold mb-4">
                    {isEditMode ? "Edit customer" : "Add customer"}
                  </h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700">BR number:</label>
                      <input
                        type="text"
                        name="BRnumber"
                        value={inputFields.BRnumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly={isEditMode}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Customer Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={inputFields.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={inputFields.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact:</label>
                      <input
                        type="text"
                        name="contact"
                        value={inputFields.contact}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="submit"
                        className="text-blue-200 font-semibold px-5 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
                      >
                        {isEditMode ? "Update" : "Add"}
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
