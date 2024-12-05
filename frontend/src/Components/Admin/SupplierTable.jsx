import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import LoadingAnimation from "../Login/LoadingAnimation";
import { IoIosArrowForward } from "react-icons/io";

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
  const [loading, setLoading] = useState(true);

  // Fetch user role from localStorage
  const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage.

  // Fetch all suppliers and categories from the API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierResponse = await axios.get(
          "http://localhost:4500/portaldev/readsupplier"
        );

        // Sorting the suppliers by createdAt in descending order
        const sortedData = supplierResponse.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSuppliers(sortedData);
        setFilteredSuppliers(sortedData);

        // Fetch categories
        const categoryResponse = await axios.get(
          "http://localhost:4500/portaldev/readcategories"
        );

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);
        setCategories(categoryResponse.data.data);
      } catch (error) {
        console.error("Error fetching suppliers or categories:", error);
      } finally {
        setLoading(false); // Stop the loading animation after both conditions are met
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
            supplier._id === selectedSupplier._id ? response.data.data : supplier
          )
        );
        setFilteredSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier._id === selectedSupplier._id ? response.data.data : supplier
          )
        );
        toast.success("Updated Successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:4500/portaldev/createsupplier",
          formData
        );
        const newSupplier = response.data.data;
        setSuppliers((prevSuppliers) => [newSupplier, ...prevSuppliers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setFilteredSuppliers((prevSuppliers) => [newSupplier, ...prevSuppliers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }

      handleCloseModal();
    } catch (error) {
      toast.error("Updated Failed!");
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteSupplier = async (SRno, id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        const response = await axios.delete(
          `http://localhost:4500/portaldev/deleteSupplier/${id}`
        );
        if (response.status === 200) {
          setSuppliers((prevSuppliers) =>
            prevSuppliers.filter((supplier) => supplier.SRno !== SRno).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          );
          setFilteredSuppliers((prevSuppliers) =>
            prevSuppliers.filter((supplier) => supplier.SRno !== SRno).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          );
        }
      } catch (error) {
        console.error("Error deleting supplier:", error.response ? error.response.data : error.message);
      }
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
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredSuppliers(filtered);
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
            <IoIosArrowForward />{userRole === 'Admin' ? 'Manage Suppliers' : 'View Suppliers'}
          </h2>
          <div className="mx-8 mt-5">
            <div>
              <div className="flex mb-4 space-x-2">
                <input
                  type="text"
                  name="SRno"
                  placeholder="Filter by SR No"
                  value={filterData.SRno}
                  onChange={handleFilterChange}
                  className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Filter by Name"
                  value={filterData.name}
                  onChange={handleFilterChange}
                  className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Filter by category"
                  value={filterData.category}
                  onChange={handleFilterChange}
                  className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Filter by mobile"
                  value={filterData.mobile}
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
            </div>

            <table className="min-w-full table-auto border border-collapse bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                  <th className="py-3 px-4 font-bold uppercase border">Supplier SR No</th>
                  <th className="py-3 px-4 font-bold uppercase border">Supplier Name</th>
                  <th className="py-3 px-4 font-bold uppercase border">Category</th>
                  <th className="py-3 px-4 font-bold uppercase border">Mobile</th>
                  {userRole === 'Admin' && (
                    <th className="py-3 px-4 font-bold uppercase border">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <tr key={supplier.SRno}>
                      <td className="py-2 px-2 font-semibold border">{supplier.SRno}</td>
                      <td className="py-2 px-2 font-semibold border">{supplier.name}</td>
                      <td className="py-2 px-2 font-semibold border">{supplier.category}</td>
                      <td className="py-2 px-2 font-semibold border">{supplier.mobile}</td>
                      {userRole === 'Admin' && (
                        <td className="py-2 flex justify-center gap-x-8 font-semibold border">
                          <button onClick={() => handleOpenModal(supplier)}>
                            <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                          </button>
                          <button onClick={() => handleDeleteSupplier(supplier.SRno, supplier._id)}>

                            <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="py-2 text-center">
                      No suppliers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-center text-xl font-bold mb-4">{isEditMode ? "Edit Supplier" : "Add Supplier"}</h2>
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
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
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
                    <div className="flex justify-end space-x-2">
                      <button
                        type="submit"
                        className="text-blue-200 font-semibold px-5 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
                      >
                        {isEditMode ? "Update" : "Add"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="text-gray-200 font-semibold px-5 py-2 rounded-lg bg-gray-500 hover:ring-2 ring-gray-500 duration-200"
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
};

export default SupplierComponent;
