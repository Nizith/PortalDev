import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialSalesFields = {
  SalesCategory: '',
  AccountManager: '',
  Manager: '',
  SalesDetails: '',
  isSolutionCoordinator: false,
};

const initialSolutionFields = {
  SolutionCategory: '',
  SolutionEngineer: '',
  isSolutionCoordinator: true,
};

// Function to get the token from local storage or any other storage
const getToken = () => localStorage.getItem('token');

export default function Coordinator() {
  const [inputFields, setInputFields] = useState(initialSalesFields);
  const [coordinators, setCoordinators] = useState([]);
  const [filteredSalesCoordinators, setFilteredSalesCoordinators] = useState([]);
  const [filteredSolutionCoordinators, setFilteredSolutionCoordinators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await axios.get(`${api}/allcordinator`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setCoordinators(response.data.data);
        setFilteredSalesCoordinators(response.data.data.filter(c => c.SalesCategory));
        setFilteredSolutionCoordinators(response.data.data.filter(c => c.SolutionCategory));

        console.log("Cordinators fetched data : ", response.data)
      } catch (error) {
        console.error('Error fetching coordinators:', error);
      }
    };

    fetchCoordinators();
  }, []);

  const handleOpenModal = (coordinator = null, isSolutionCoordinator = false) => {
    if (coordinator) {
      setIsEditMode(true);
      setInputFields({...coordinator, isSolutionCoordinator: !!coordinator.SolutionCategory});
    } else {
      setIsEditMode(false);
      setInputFields(isSolutionCoordinator ? initialSolutionFields : initialSalesFields);
    }
    setSelectedCoordinator(coordinator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputFields(initialSalesFields);
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
        const response = await axios.put(
          `${api}/updatecoordinator/${selectedCoordinator._id}`,
          inputFields,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        setCoordinators((prevCoordinators) =>
          prevCoordinators.map((coordinator) =>
            coordinator._id === selectedCoordinator._id ? response.data.data : coordinator
          )
        );
      } else {
        const response = await axios.post(
          `${api}/createCoordinator`,
          inputFields,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        setCoordinators((prevCoordinators) => [...prevCoordinators, response.data.data]);
      }

      // Update filtered lists
      setFilteredSalesCoordinators(coordinators.filter(c => c.SalesCategory));
      setFilteredSolutionCoordinators(coordinators.filter(c => c.SolutionCategory));

      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteCoordinator = async (coordinatorID) => {
    try {
      const response = await axios.delete(`${api}/deletecoordinator/${coordinatorID}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.status === 200) {
        setCoordinators((prevCoordinators) =>
          prevCoordinators.filter((coordinator) => coordinator._id !== coordinatorID)
        );
        // Update filtered lists
        setFilteredSalesCoordinators(coordinators.filter(c => !c.SolutionCategory));
        setFilteredSolutionCoordinators(coordinators.filter(c => c.SolutionCategory));
      }
    } catch (error) {
      console.error('Error deleting coordinator:', error.response ? error.response.data : error.message);
    }
  };

  const handleFilterSalesChange = (e) => {
    const { value } = e.target;
    setFilteredSalesCoordinators(
      coordinators.filter((coordinator) =>
        !coordinator.SolutionCategory &&
        coordinator.SalesCategory.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleFilterSolutionChange = (e) => {
    const { value } = e.target;
    setFilteredSolutionCoordinators(
      coordinators.filter((coordinator) =>
        coordinator.SolutionCategory &&
        coordinator.SolutionCategory.toLowerCase().includes(value.toLowerCase())
      )
    );
  };


  
  console.log("sales cordinators fetched data to var : ", filteredSalesCoordinators)
  return (
    <>
      <div className="flex flex-col md:flex-row float-right w-full min-h-screen">
        <div className="flex-1 mx-4">
          <h3 className="text-center text-3xl mb-2">Sales Information</h3>
          <div className="bg-white w-full p-4 rounded-lg shadow-lg">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
              onClick={() => handleOpenModal(null, false)}
            >
              New Coordinator
            </button>
            <input
              type="text"
              placeholder="Filter by Sales Category"
              onChange={handleFilterSalesChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 border">Sales Category</th>
                  <th className="py-2 px-4 border">Account Manager</th>
                  <th className="py-2 px-4 border">Manager</th>
                  <th className="py-2 px-4 border">Sales Details</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesCoordinators.length > 0 ? (
                  filteredSalesCoordinators.map((coordinator) => (
                    <tr key={coordinator._id}>
                      <td className="py-2 px-4 border">{coordinator.SalesCategory}</td>
                      <td className="py-2 px-4 border">{coordinator.AccountManager}</td>
                      <td className="py-2 px-4 border">{coordinator.Manager}</td>
                      <td className="py-2 px-4 border">{coordinator.SalesDetails}</td>
                      <td className="py-2 px-4 border">
                        <button
                          className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                          onClick={() => handleOpenModal(coordinator)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                          onClick={() => handleDeleteCoordinator(coordinator._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 border text-center">
                      No coordinators found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 mx-4">
          <h3 className="text-center text-3xl mb-2">Solution Information</h3>
          <div className="bg-white w-full p-4 rounded-lg shadow-lg">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
              onClick={() => handleOpenModal(null, true)}
            >
              New solution Coordinator
            </button>
            <input
              type="text"
              placeholder="Filter by Solution Category"
              onChange={handleFilterSolutionChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 border">Solution Category</th>
                  <th className="py-2 px-4 border">Solution Engineer</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSolutionCoordinators.length > 0 ? (
                  filteredSolutionCoordinators.map((coordinator) => (
                    <tr key={coordinator._id}>
                      <td className="py-2 px-4 border">{coordinator.SolutionCategory}</td>
                      <td className="py-2 px-4 border">{coordinator.SolutionEngineer}</td>
                      <td className="py-2 px-4 border">
                        <button
                          className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                          onClick={() => handleOpenModal(coordinator)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                          onClick={() => handleDeleteCoordinator(coordinator._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-2 px-4 border text-center">
                      No coordinators found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">
              {isEditMode ? 'Edit Coordinator' : (inputFields.isSolutionCoordinator ? 'Add New Solution Coordinator' : 'Add New Coordinator')}
            </h2>
            <form onSubmit={handleFormSubmit}>
              {!inputFields.isSolutionCoordinator ? (
                <>
                  <div className="mb-4">
                    <label htmlFor="SalesCategory" className="block text-sm font-medium text-gray-700">
                      Sales Category
                    </label>
                    <input
                      type="text"
                      name="SalesCategory"
                      id="SalesCategory"
                      value={inputFields.SalesCategory}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="AccountManager" className="block text-sm font-medium text-gray-700">
                      Account Manager
                    </label>
                    <input
                      type="text"
                      name="AccountManager"
                      id="AccountManager"
                      value={inputFields.AccountManager}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="Manager" className="block text-sm font-medium text-gray-700">
                      Manager
                    </label>
                    <input
                      type="text"
                      name="Manager"
                      id="Manager"
                      value={inputFields.Manager}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="SalesDetails" className="block text-sm font-medium text-gray-700">
                      Sales Details
                    </label>
                    <textarea
                      name="SalesDetails"
                      id="SalesDetails"
                      value={inputFields.SalesDetails}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                      rows="3"
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label htmlFor="SolutionCategory" className="block text-sm font-medium text-gray-700">
                      Solution Category
                    </label>
                    <input
                      type="text"
                      name="SolutionCategory"
                      id="SolutionCategory"
                      value={inputFields.SolutionCategory}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="SolutionEngineer" className="block text-sm font-medium text-gray-700">
                      Solution Engineer
                    </label>
                    <input
                      type="text"
                      name="SolutionEngineer"
                      id="SolutionEngineer"
                      value={inputFields.SolutionEngineer}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {isEditMode ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}