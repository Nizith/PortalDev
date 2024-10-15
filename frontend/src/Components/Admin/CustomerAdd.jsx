import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import LoadingAnimation from "../Login/LoadingAnimation";

const initialInputFields = {
  BRnumber: "",
  name: "",
  email: "",
  contact: "",
};

export default function customerTable() {
  const [customer, setcustomer] = useState([]);
  const [filteredcustomer, setFilteredcustomer] = useState([]);
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedcustomer, setSelectedcustomer] = useState(null);
  const [loading, setLoading] = useState(true);


  // Fetch all customer from the API
  useEffect(() => {
    const fetchcustomer = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/readcustomer");

        // Simulate minimum 2-second loading time
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));

        // Wait for both data fetch and 2 seconds delay
        await Promise.all([delay, response]);


        setcustomer(response.data.data); // Assuming response.data.data contains the list of customer
        setFilteredcustomer(response.data.data); // Set filtered customer initially to all customer
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false); // Stop the loading animation after both conditions are met
      }
    };

    fetchcustomer();
  }, []);

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setIsEditMode(true);
      setInputFields(customer);
    } else {
      setIsEditMode(false);
      setInputFields(initialInputFields);
    }
    setSelectedcustomer(customer);
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

  const handleFormSubmit = async (e, id) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Edit customer logic
        const response = await axios.put(
          `http://localhost:4500/portaldev/updateCustomer/${selectedcustomer._id}`
          ,
          inputFields
        );
        setcustomer((prevcustomer) =>
          prevcustomer.map((customer) =>
            customer.BRnumber === selectedcustomer.BRnumber
              ? response.data.data
              : customer
          )
        );
        setFilteredcustomer((prevcustomer) =>
          prevcustomer.map((customer) =>
            customer.BRnumber === selectedcustomer.BRnumber
              ? response.data.data
              : customer
          )
        );
      } else {
        // Add new customer logic
        const response = await axios.post(
          "http://localhost:4500/portaldev/createcustomer",
          inputFields
        );
        setcustomer((prevcustomer) => [...prevcustomer, response.data.data]);
        setFilteredcustomer((prevcustomer) => [...prevcustomer, response.data.data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeletecustomer = async (BRnumber, id) => {
    try {
      const response = await axios.delete(`http://localhost:4500/portaldev/deletecustomer/${id}`);
      if (response.status === 200) {
        setcustomer((prevcustomer) =>
          prevcustomer.filter((customer) => customer.BRnumber !== BRnumber)
        );
        setFilteredcustomer((prevcustomer) =>
          prevcustomer.filter((customer) => customer.BRnumber !== BRnumber)
        );
      }
    } catch (error) {
      console.error("Error deleting customer:", error.response ? error.response.data : error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilteredcustomer(
      customer.filter((customer) =>
        customer[name].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      {loading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <div className="float-right w-full min-h-screen">
          <h2 className="flex justify-center text-black font-bold text-2xl mt-4">Customer Table</h2>
          <div className="mx-8 my-5">
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
              <button
                className="bg-green-800 hover:ring-2 ring-green-500 text-green-200 font-semibold px-5 py-2 rounded-lg duration-200"
                onClick={() => handleOpenModal()}
              >
                New
              </button>
            </div>

            <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                  <th className="py-3 px-4 font-bold uppercase border">BR number</th>
                  <th className="py-3 px-4 font-bold uppercase border">Name</th>
                  <th className="py-3 px-4 font-bold uppercase border">Email</th>
                  <th className="py-3 px-4 font-bold uppercase border">Contact</th>
                  <th className="py-3 px-4 font-bold uppercase border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredcustomer.length > 0 ? (
                  filteredcustomer.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-all duration-300 ease-in-out">
                      <td className="py-2 px-2 font-semibold border">{customer.BRnumber}</td>
                      <td className="py-2 px-2 font-semibold border">{customer.name}</td>
                      <td className="py-2 px-2 font-semibold border">{customer.email}</td>
                      <td className="py-2 px-2 font-semibold border">{customer.contact}</td>
                      <td className="py-2 px-2 font-semibold border text-center space-x-6">
                        <button onClick={() => handleOpenModal(customer)} >
                          <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                        </button>
                        <button onClick={() => handleDeletecustomer(customer.BRnumber, customer._id)} >
                          <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 border text-center">
                      no customer found
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
                      <label className="block text-gray-700">customer Name:</label>
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
                        className="text-gray-200 font-semibold px-5 py-2 rounded-lg bg-gray-800 hover:ring-2 ring-gray-500 duration-200"
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
