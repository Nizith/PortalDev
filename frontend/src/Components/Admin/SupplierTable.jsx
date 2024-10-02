import React, { useState, useEffect } from "react";
import axios from "axios";

const SupplierComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    SRno: "",
    name: "",
    category: "",
    mobile: "",
    description: "",
  });
  const [filterData, setFilterData] = useState({
    SRno: "",
    name: "",
    category: "",
    mobile: "",
  });
  const [categories, setCategories] = useState([]);

  // Fetch all suppliers and categories from the API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierResponse = await axios.get(
          "http://localhost:4500/portaldev/readsupplier"
        );
        setSuppliers(supplierResponse.data.data);
        setFilteredSuppliers(supplierResponse.data.data);

        // Fetch categories
        const categoryResponse = await axios.get(
          "http://localhost:4500/portaldev/readcategories"
        );
        setCategories(categoryResponse.data.data);
      } catch (error) {
        console.error("Error fetching suppliers or categories:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleOpenModal = (supplier = null) => {
    if (supplier) {
      setIsEditMode(true);
      setFormData(supplier);
    } else {
      setIsEditMode(false);
      setFormData({
        SRno: "",
        name: "",
        category: "",
        mobile: "",
        description: "",
      });
    }
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      SRno: "",
      name: "",
      category: "",
      mobile: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      [name]: value,
    }));
    
    // Apply filter immediately when input changes
    handleFilterSubmit({ ...filterData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const response = await axios.put(
          `http://localhost:4500/portaldev/updatesupplier/${selectedSupplier._id}`,
          formData
        );
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier._id === selectedSupplier._id
              ? response.data.data
              : supplier
          )
        );
        setFilteredSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier._id === selectedSupplier._id
              ? response.data.data
              : supplier
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:4500/portaldev/createsupplier",
          formData
        );
        setSuppliers((prevSuppliers) => [
          ...prevSuppliers,
          response.data.data,
        ]);
        setFilteredSuppliers((prevSuppliers) => [
          ...prevSuppliers,
          response.data.data,
        ]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteSupplier = async (SRno,id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4500/portaldev/deleteSupplier/${id}`
      );
      if (response.status === 200) {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.SRno !== SRno)
        );
        setFilteredSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.SRno !== SRno)
        );
      }
    } catch (error) {
      console.error("Error deleting supplier:", error.response ? error.response.data : error.message);
    }
  };

  const handleFilterSubmit = (currentFilterData = filterData) => {
    const filtered = suppliers.filter((supplier) => {
      return (
        (currentFilterData.SRno === "" ||
          supplier.SRno.toString().toLowerCase().includes(currentFilterData.SRno.toLowerCase())) &&
        (currentFilterData.name === "" ||
          supplier.name.toLowerCase().includes(currentFilterData.name.toLowerCase())) &&
        (currentFilterData.category === "" ||
          supplier.category.toLowerCase().includes(currentFilterData.category.toLowerCase())) &&
        (currentFilterData.mobile === "" ||
          supplier.mobile.toString().toLowerCase().includes(currentFilterData.mobile.toLowerCase()))
      );
    });
    setFilteredSuppliers(filtered);
  };

  return (
    <>
      <div className="float-right w-full min-h-screen">
        <h2 className="flex justify-center text-black font-bold text-2xl mt-4">Supplier Table</h2>
        <div className="mx-8 mt-4">
          <div>
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                name="SRno"
                placeholder="Filter by SR No"
                value={filterData.SRno}
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="name"
                placeholder="Filter by Name"
                value={filterData.name}
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Filter by category"
                value={filterData.category}
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Filter by mobile"
                value={filterData.mobile}
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
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 border">Supplier SR No</th>
                <th className="py-2 px-4 border">Supplier Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Mobile</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.SRno}>
                    <td className="py-2 px-4 border">{supplier.SRno}</td>
                    <td className="py-2 px-4 border">{supplier.name}</td>
                    <td className="py-2 px-4 border">{supplier.category}</td>
                    <td className="py-2 px-4 border">{supplier.mobile}</td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        onClick={() => handleOpenModal(supplier)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDeleteSupplier(supplier.SRno, supplier._id)}
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

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Supplier" : "Add Supplier"}</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Supplier SR No:</label>
                    <input
                      type="text"
                      name="SRno"
                      value={formData.SRno}
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
                      value={formData.name}
                      onChange={handleInputChange}                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Category:</label>
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Mobile:</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                  </div> 
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {isEditMode ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
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
    </>
  );
};

export default SupplierComponent;