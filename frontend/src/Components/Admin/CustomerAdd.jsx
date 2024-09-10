import React, { useState, useEffect } from "react";
import axios from "axios";

const initialInputFields = {
  BRnumber: "",
  name: "",
  email: "",
  contact: "",
};

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Fetch all suppliers from the API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/readcustomer");
        setSuppliers(response.data.data); // Assuming response.data.data contains the list of suppliers
        setFilteredSuppliers(response.data.data); // Set filtered suppliers initially to all suppliers
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleOpenModal = (supplier = null) => {
    if (supplier) {
      setIsEditMode(true);
      setInputFields(supplier);
    } else {
      setIsEditMode(false);
      setInputFields(initialInputFields);
    }
    setSelectedSupplier(supplier);
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
        // Edit supplier logic
        const response = await axios.put(
         `http://localhost:4500/portaldev/updateCustomer/${selectedSupplier.BRnumber}`
, 
          inputFields
        );
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.BRnumber === selectedSupplier.BRnumber
              ? response.data.data
              : supplier
          )
        );
        setFilteredSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.BRnumber === selectedSupplier.BRnumber
              ? response.data.data
              : supplier
          )
        );
      } else {
        // Add new supplier logic
        const response = await axios.post(
          "http://localhost:4500/portaldev/createcustomer",
          inputFields
        );
        setSuppliers((prevSuppliers) => [...prevSuppliers, response.data.data]);
        setFilteredSuppliers((prevSuppliers) => [...prevSuppliers, response.data.data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteSupplier = async (BRnumber) => {
    try {
      const response = await axios.delete(`http://localhost:4500/portaldev/deletesupplier/${BRnumber}`);
      if (response.status === 200) {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.BRnumber !== BRnumber)
        );
        setFilteredSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.BRnumber !== BRnumber)
        );
      }
    } catch (error) {
      console.error("Error deleting supplier:", error.response ? error.response.data : error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier[name].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="p-8 bg-slate-200">
      <h3 className="text-center font-medium text-4xl mt-1">Customer Table</h3>
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
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier, index) => (
              <tr key={index} className={`bg-${index % 2 === 0 ? "blue-50" : "white"}`}>
                <td className="py-2 px-4 border-b">{supplier.BRnumber}</td>
                <td className="py-2 px-4 border-b">{supplier.name}</td>
                <td className="py-2 px-4 border-b">{supplier.email}</td>
                <td className="py-2 px-4 border-b">{supplier.contact}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                    onClick={() => handleOpenModal(supplier)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                    onClick={() => handleDeleteSupplier(supplier.BRnumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 border text-center">
                No suppliers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit Supplier */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Supplier" : "Add Supplier"}
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
                <label className="block text-gray-700">Supplier Name:</label>
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
  );
}
