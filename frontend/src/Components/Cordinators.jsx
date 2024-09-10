import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialInputFields = {
  SalesCategory: '',
  SolutionCategory: '',
  AccountManager: '',
  Manager: '',
  SalesEngineer: '',
  SolutionEngineer: '',
};

export default function Cordinator() {
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [cordinators, setCordinators] = useState([]);
  const [filteredCordinators, setFilteredCordinators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCordinator, setSelectedCordinator] = useState(null);

  // Fetch all cordinators from the API
  useEffect(() => {
    const fetchCordinators = async () => {
      try {
        const response = await axios.get('http://localhost:4500/portaldev/allcordinator');
        setCordinators(response.data.data); // Assuming response.data.data contains the list of cordinators
        setFilteredCordinators(response.data.data); // Set filtered cordinators initially to all cordinators
      } catch (error) {
        console.error('Error fetching cordinators:', error);
      }
    };

    fetchCordinators();
  }, []);

  const handleOpenModal = (cordinator = null) => {
    if (cordinator) {
      setIsEditMode(true);
      setInputFields(cordinator);
    } else {
      setIsEditMode(false);
      setInputFields(initialInputFields);
    }
    setSelectedCordinator(cordinator);
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
        // Edit cordinator logic
        const response = await axios.put(
          `http://localhost:4500/portaldev/updatecordinator/${selectedCordinator._id}`, // Assuming _id is the identifier field
          inputFields
        );
        setCordinators((prevCordinators) =>
          prevCordinators.map((cordinator) =>
            cordinator._id === selectedCordinator._id
              ? response.data.data
              : cordinator
          )
        );
        setFilteredCordinators((prevCordinators) =>
          prevCordinators.map((cordinator) =>
            cordinator._id === selectedCordinator._id
              ? response.data.data
              : cordinator
          )
        );
      } else {
        // Add new cordinator logic
        const response = await axios.post(
            'http://localhost:4500/portaldev/createCordinator',
          inputFields
        );
        setCordinators((prevCordinators) => [...prevCordinators, response.data.data]);
        setFilteredCordinators((prevCordinators) => [...prevCordinators, response.data.data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteCordinator = async (cordinatorID) => {
    try {
      const response = await axios.delete(`http://localhost:4500/portaldev/deletecordinator/${cordinatorID}`);
      if (response.status === 200) {
        setCordinators((prevCordinators) =>
          prevCordinators.filter((cordinator) => cordinator._id !== cordinatorID)
        );
        setFilteredCordinators((prevCordinators) =>
          prevCordinators.filter((cordinator) => cordinator._id !== cordinatorID)
        );
      }
    } catch (error) {
      console.error('Error deleting cordinator:', error.response ? error.response.data : error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilteredCordinators(
      cordinators.filter((cordinator) =>
        cordinator[name].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <h3 className="text-center font-medium text-4xl mt-1">Cordinator Table</h3>
      <div className="w-screen h-screen flex flex-col justify-center items-center py-2 table-fixed">
        <div className="bg-white w-3/4 p-8 rounded-lg shadow-lg">
          {/* Filter Inputs */}
          <div className="flex mb-4 space-x-2">
            <input
              type="text"
              name="SalesCategory"
              placeholder="Filter by Sales Category"
              onChange={handleFilterChange}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              name="SolutionCategory"
              placeholder="Filter by Solution Category"
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
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 border">Sales Category</th>
                <th className="py-2 px-4 border">Solution Category</th>
                <th className="py-2 px-4 border">Account Manager</th>
                <th className="py-2 px-4 border">Manager</th>
                <th className="py-2 px-4 border">Sales Engineer</th>
                <th className="py-2 px-4 border">Solution Engineer</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCordinators.length > 0 ? (
                filteredCordinators.map((cordinator) => (
                  <tr key={cordinator._id}>
                    <td className="py-2 px-4 border">{cordinator.SalesCategory}</td>
                    <td className="py-2 px-4 border">{cordinator.SolutionCategory}</td>
                    <td className="py-2 px-4 border">{cordinator.AccountManager}</td>
                    <td className="py-2 px-4 border">{cordinator.Manager}</td>
                    <td className="py-2 px-4 border">{cordinator.SalesEngineer}</td>
                    <td className="py-2 px-4 border">{cordinator.SolutionEngineer}</td>
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        onClick={() => handleOpenModal(cordinator)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDeleteCordinator(cordinator._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 border text-center">
                    No cordinators found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modal for Add/Edit Cordinator */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">
                  {isEditMode ? 'Edit Cordinator' : 'Add Cordinator'}
                </h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Sales Category:</label>
                    <select
                      name="SalesCategory"
                      value={inputFields.SalesCategory}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      <option value="SMB">SMB</option>
                      <option value="ICT">ICT</option>
                      <option value="Carriers">Carriers</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Solution Category:</label>
                    <select
                      name="SolutionCategory"
                      value={inputFields.SolutionCategory}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      <option value="Transmission">Transmission</option>
                      <option value="Telecom">Telecom</option>
                      <option value="Datacenter">Datacenter</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Account Manager:</label>
                    <input
                      type="text"
                      name="AccountManager"
                      value={inputFields.AccountManager}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Manager:</label>
                    <input
                      type="text"
                      name="Manager"
                      value={inputFields.Manager}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Sales Engineer:</label>
                    <input
                      type="text"
                      name="SalesEngineer"
                      value={inputFields.SalesEngineer}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Solution Engineer:</label>
                    <input
                      type="text"
                      name="SolutionEngineer"
                      value={inputFields.SolutionEngineer}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {isEditMode ? 'Update' : 'Add'}
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
