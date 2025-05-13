import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { api } from '../../api';

const SalesCategoryComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [coordinators, setCoordinators] = useState([]);
  const [filteredCoordinators, setFilteredCoordinators] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [formData, setFormData] = useState({
    sectionName: '',
    SalesCategory: '',
    AccountManager: '',
    Manager: '',
    SalesEngineer: ''
  });

  // Filter states
  const [salesCategoryFilter, setSalesCategoryFilter] = useState('');
  const [managerFilter, setManagerFilter] = useState('');
  
  // Fetch user role from localStorage
  const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage.

  useEffect(() => {
    fetchCoordinators();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [salesCategoryFilter, managerFilter, coordinators]);

  // Function to get the token from local storage
  const getToken = () => localStorage.getItem('token');

  // Fetch all coordinators
  const fetchCoordinators = async () => {
    try {
      const response = await axios.get(`${api}/allcordinator`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by createdAt
      setCoordinators(sortedData);
      setFilteredCoordinators(sortedData); // Initialize filtered list with sorted data
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    }
  };

  // Handle filter logic
  const handleFilter = () => {
    const filtered = coordinators.filter((coordinator) => {
      return (
        (salesCategoryFilter === '' || coordinator.SalesCategory.includes(salesCategoryFilter)) &&
        (managerFilter === '' || coordinator.Manager.includes(managerFilter))
      );
    });
    setFilteredCoordinators(filtered);
  };

  // Open the modal for Add or Edit
  const handleOpenModal = (coordinator = null) => {
    if (coordinator) {
      setIsEditMode(true);
      setFormData(coordinator);
    } else {
      setIsEditMode(false);
      setFormData({
        sectionName: '',
        SalesCategory: '',
        AccountManager: '',
        Manager: '',
        SalesEngineer: ''
      });
    }
    setSelectedCoordinator(coordinator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      sectionName: '',
      SalesCategory: '',
      AccountManager: '',
      Manager: '',
      SalesEngineer: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`${api}/updatecordinator/${selectedCoordinator._id}`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchCoordinators();
      } 
      
      else {
        const response = await axios.post(`${api}/createCordinator`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const newCoordinator = response.data.data;
        setCoordinators((prevCoordinators) => [newCoordinator, ...prevCoordinators].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setFilteredCoordinators((prevCoordinators) => [newCoordinator, ...prevCoordinators].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
      toast.success("Updated Successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Updated Failed!");
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this payment?')){
    try {
      await axios.delete(`${api}/deletecordinator/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      fetchCoordinators();
    } catch (error) {
      console.error('Error deleting coordinator:', error);
    }
  }
  };
  
  return (
    <>
    <Toaster/>
    <div className="float-right w-full min-h-screen">
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          placeholder="Filter by Sales Category"
          className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
          value={salesCategoryFilter}
          onChange={(e) => setSalesCategoryFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Manager"
          className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
          value={managerFilter}
          onChange={(e) => setManagerFilter(e.target.value)}
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
            <th className="py-3 px-4 font-bold uppercase border">Section Name</th>
            <th className="py-3 px-4 font-bold uppercase border">Sales Category</th>
            <th className="py-3 px-4 font-bold uppercase border">Account Manager</th>
            <th className="py-3 px-4 font-bold uppercase border">Manager</th>
            <th className="py-3 px-4 font-bold uppercase border">Sales Engineer</th>
            {userRole === 'Admin' && (
                <th className="py-3 px-4 font-bold uppercase border">Actions</th>
              )}
          </tr>
        </thead>
        <tbody>
          {filteredCoordinators.map((coordinator) => (
            <tr key={coordinator._id} className="border-t">
              <td className="py-2 px-2 font-semibold border">{coordinator.sectionName}</td>
              <td className="py-2 px-2 font-semibold border">{coordinator.SalesCategory}</td>
              <td className="py-2 px-2 font-semibold border">{coordinator.AccountManager}</td>
              <td className="py-2 px-2 font-semibold border">{coordinator.Manager}</td>
              <td className="py-2 px-2 font-semibold border">{coordinator.SalesEngineer}</td>
              {userRole === 'Admin' && (
              <td className="py-2 flex justify-center gap-x-8 font-semibold border">
                <button onClick={() => handleOpenModal(coordinator)}>
                <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                </button>
                <button onClick={() => handleDelete(coordinator._id)}>
                <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                </button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h3 className="text-center text-xl font-bold mb-4">
              {isEditMode ? 'Edit Coordinator' : 'Add New Coordinator'}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700">Section Name</label>
                <input
                  type="text"
                  name="sectionName"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.sectionName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Sales Category</label>
                <input
                  type="text"
                  name="SalesCategory"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.SalesCategory}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Account Manager</label>
                <input
                  type="text"
                  name="AccountManager"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.AccountManager}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Manager</label>
                <input
                  type="text"
                  name="Manager"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.Manager}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Sales Engineer</label>
                <input
                  type="text"
                  name="SalesEngineer"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.SalesEngineer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                
                <button
                  type="submit"
                  className="text-blue-200 font-semibold px-5 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
                >
                  {isEditMode ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-200 font-semibold px-5 py-2 rounded-lg bg-gray-500 hover:ring-2 ring-gray-500 duration-200"
                >
                  Cancel
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default SalesCategoryComponent;
