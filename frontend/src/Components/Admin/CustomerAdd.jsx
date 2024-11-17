import React, { useState, useEffect } from "react";
import axios from "axios";

const initialInputFields = {
  BRnumber: "",
  name: "",
  email: "",
  contact: "",
};

export default function customerTable() {
  const [customer, setCustomer] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch all customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/readcustomer");
        const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by createdAt
        setCustomer(sortedData); // Set sorted data
        setFilteredCustomer(sortedData); // Set filtered customers to sorted data initially
      } catch (error) {
        console.error("Error fetching customers:", error);
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
                `http://localhost:4500/portaldev/updateCustomer/${selectedCustomer._id}`,
                inputFields
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
        } else {
            // Add new customer logic
            const response = await axios.post(
                "http://localhost:4500/portaldev/createcustomer",
                inputFields
            );

            const newCustomer = response.data.data;
            setCustomer((prevCustomers) => [newCustomer, ...prevCustomers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setFilteredCustomer((prevCustomers) => [newCustomer, ...prevCustomers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }

        handleCloseModal();
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};


  const handleDeleteCustomer = async (BRnumber, id) => {
    try {
      const response = await axios.delete(`http://localhost:4500/portaldev/deletecustomer/${id}`);
      if (response.status === 200) {
        setCustomer((prevCustomers) =>
          prevCustomers.filter((customer) => customer.BRnumber !== BRnumber).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        setFilteredCustomer((prevCustomers) =>
          prevCustomers.filter((customer) => customer.BRnumber !== BRnumber).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      }
    } catch (error) {
      console.error("Error deleting customer:", error.response ? error.response.data : error.message);
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
      <div className="float-right w-full min-h-screen">
        <h2 className="flex justify-center text-black font-bold text-2xl mt-4">Customer Table</h2>
        <div className="mx-8 mt-5">
          <div className="flex mb-4 space-x-2">
            <input
              type="text"
              name="BRnumber"
              placeholder="Filter by BR number"
              onChange={handleFilterChange}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Filter by Name"
              onChange={handleFilterChange}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={() => handleOpenModal()}
            >
              New
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="py-2 px-4 border-b">BR number</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomer.length > 0 ? (
                filteredCustomer.map((customer, index) => (
                  <tr key={index} className={`bg-${index % 2 === 0 ? "blue-50" : "white"}`}>
                    <td className="py-2 px-4 border-b">{customer.BRnumber}</td>
                    <td className="py-2 px-4 border-b">{customer.name}</td>
                    <td className="py-2 px-4 border-b">{customer.email}</td>
                    <td className="py-2 px-4 border-b">{customer.contact}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        onClick={() => handleOpenModal(customer)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDeleteCustomer(customer.BRnumber, customer._id)}
                      >
                        Delete
                      </button>
                    </td>
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
                      type="button"
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
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
