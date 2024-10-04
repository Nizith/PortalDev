import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const SolutionCategoryComponent = ({ fetchCoordinators, coordinators, filteredCoordinators, setFilteredCoordinators }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [formData, setFormData] = useState({
    sectionName: '',
    SolutionCategory: '',
    SolutionEngineer: ''
  });

  // Filter states
  const [SolutionCategory, setSolutionCategory] = useState('');
  const [filterSectionName, setFilterSectionName] = useState('');

  // Handle filter change
  useEffect(() => {
    handleFilter();
  }, [SolutionCategory, filterSectionName, coordinators]);



  // Handle filter logic
  const handleFilter = () => {
    const filtered = coordinators.filter((coordinator) => {
      return (
        coordinator.sectionName.toLowerCase().includes(filterSectionName.toLowerCase()) &&
        (!SolutionCategory || coordinator._id.includes(SolutionCategory))
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
        SolutionCategory: '',
        SolutionEngineer: ''
      });
    }
    setSelectedCoordinator(coordinator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      sectionName: '',
      SolutionCategory: '',
      SolutionEngineer: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:4500/portaldev/updatecordinator/${selectedCoordinator._id}`, formData);
        fetchCoordinators();
      } else {
        await axios.post('http://localhost:4500/portaldev/createCordinator', formData);
        fetchCoordinators();
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/portaldev/deletecordinator/${id}`);
      fetchCoordinators();
    } catch (error) {
      console.error('Error deleting coordinator:', error);
    }
  };

  return (
    <>
      <div className="min-h-screen my-5">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder=""
            className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
            value={SolutionCategory}
            onChange={(e) => setSolutionCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Section Name"
            className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
            value={filterSectionName}
            onChange={(e) => setFilterSectionName(e.target.value)}
          />
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-800 hover:ring-2 ring-green-500 text-green-200 font-semibold px-5 py-2 rounded-lg duration-200"
          >
            New
          </button>
        </div>

        <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
              <th className="py-4 px-4 font-bold uppercase border">Section Name</th>
              <th className="py-4 px-4 font-bold uppercase border">Solution Category</th>
              <th className="py-4 px-4 font-bold uppercase border">Solution Engineer</th>
              <th className="py-4 px-4 font-bold uppercase border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoordinators.map((coordinator) => (
              <tr key={coordinator._id} className="hover:bg-gray-200 transition-all duration-300 ease-in-out">
                <td className="py-4 px-4 font-semibold border">{coordinator.sectionName}</td>
                <td className="py-4 px-4 font-semibold border">{coordinator.SolutionCategory}</td>
                <td className="py-4 px-4 font-semibold border">{coordinator.SolutionEngineer}</td>
                <td className="py-4 px-2 font-semibold border text-center space-x-6">
                  <button onClick={() => handleOpenModal(coordinator)} >
                    <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                  </button>
                  <button onClick={() => handleDelete(coordinator._id)} >
                    <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">
                {isEditMode ? 'Edit Coordinator' : 'Add New Coordinator'}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Section Name</label>
                  <input
                    type="text"
                    name="sectionName"
                    className="w-full border p-2 rounded"
                    value={formData.sectionName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Solution Category</label>
                  <input
                    type="text"
                    name="SolutionCategory"
                    className="w-full border p-2 rounded"
                    value={formData.SolutionCategory}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Solution Engineer</label>
                  <input
                    type="text"
                    name="SolutionEngineer"
                    className="w-full border p-2 rounded"
                    value={formData.SolutionEngineer}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="text-blue-200 font-semibold px-5 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200"
                  >
                    {isEditMode ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-gray-200 font-semibold px-5 py-2 rounded-lg bg-gray-800 hover:ring-2 ring-gray-500 duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SolutionCategoryComponent;
