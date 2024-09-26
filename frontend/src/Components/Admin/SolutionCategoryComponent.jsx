import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExampleComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [coordinators, setCoordinators] = useState([]);
  const [filteredCoordinators, setFilteredCoordinators] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [formData, setFormData] = useState({
    sectionName: '',
    SolutionCategory: '',
    SolutionEngineer: ''
  });

  // Filter states
  const [SolutionCategory, setSolutionCategory] = useState('');
  const [filterSectionName, setFilterSectionName] = useState('');

  // Fetch coordinators on component mount
  useEffect(() => {
    fetchCoordinators();
  }, []);

  // Handle filter change
  useEffect(() => {
    handleFilter();
  }, [SolutionCategory, filterSectionName, coordinators]);

  // Fetch all coordinators
  const fetchCoordinators = async () => {
    try {
      const response = await axios.get('http://localhost:4500/portaldev/allcordinator');
      setCoordinators(response.data.data);
      setFilteredCoordinators(response.data.data); // Initialize filtered list with full data
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    }
  };

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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Coordinator Management</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder=""
          className="border p-2 rounded w-1/3"
          value={SolutionCategory}
          onChange={(e) => setSolutionCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Section Name"
          className="border p-2 rounded w-1/3"
          value={filterSectionName}
          onChange={(e) => setFilterSectionName(e.target.value)}
        />
        <div></div>
      </div>
      <button
        onClick={() => handleOpenModal()}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New 
      </button>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-500">
            <th className="py-2 px-4">Section Name</th>
            <th className="py-2 px-4">Solution Category</th>
            <th className="py-2 px-4">Solution Engineer</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoordinators.map((coordinator) => (
            <tr key={coordinator._id} className="border-t">
              <td className="py-2 px-4">{coordinator.sectionName}</td>
              <td className="py-2 px-4">{coordinator.SolutionCategory}</td>
              <td className="py-2 px-4">{coordinator.SolutionEngineer}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleOpenModal(coordinator)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coordinator._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
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
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;
