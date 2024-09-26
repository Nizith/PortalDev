import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Fetch all customer from the API
  useEffect(() => {
    const fetchcustomer = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/readcustomer");
        setcustomer(response.data.data); // Assuming response.data.data contains the list of customer
        setFilteredcustomer(response.data.data); // Set filtered customer initially to all customer
      } catch (error) {
        console.error("Error fetching customer:", error);
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

  const handleFormSubmit = async (e,id) => {
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

  const handleDeletecustomer = async (BRnumber,id) => {
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
      <div className="float-right w-full min-h-screen">
        <h2 className="flex justify-center text-black">Customer Table</h2>
        <div className="mx-8">
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
              {filteredcustomer.length > 0 ? (
                filteredcustomer.map((customer, index) => (
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
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDeletecustomer(customer.BRnumber,customer._id)}
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
