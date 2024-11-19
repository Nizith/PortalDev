import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialInputFields = {
  sectionID: '',
  sectionName: '',
};

export default function DataTable() {
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  // Fetch all sections from the API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:4500/portaldev/readsection');
        setSections(response.data.data); // The data should be sorted by createdAt in descending order
        setFilteredSections(response.data.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleOpenModal = (section = null) => {
    if (section) {
      setIsEditMode(true);
      setInputFields(section);
    } else {
      setIsEditMode(false);
      setInputFields(initialInputFields);
    }
    setSelectedSection(section);
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
        // Edit section logic
        const response = await axios.put(
          `http://localhost:4500/portaldev/updatesection/${selectedSection._id}`,
          inputFields
        );
        setSections((prevSections) =>
          prevSections.map((section) =>
            section._id === selectedSection._id
              ? response.data.data
              : section
          )
        );
        setFilteredSections((prevSections) =>
          prevSections.map((section) =>
            section._id === selectedSection._id
              ? response.data.data
              : section
          )
        );
      } else {
        // Add new section logic
        const response = await axios.post(
          'http://localhost:4500/portaldev/createsection',
          inputFields
        );
        setSections((prevSections) => [response.data.data, ...prevSections]);
        setFilteredSections((prevSections) => [response.data.data, ...prevSections]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteSection = async (sectionID, id) => {
    try {
      const response = await axios.delete(`http://localhost:4500/portaldev/deletesection/${id}`);
      if (response.status === 200) {
        setSections((prevSections) =>
          prevSections.filter((section) => section.sectionID !== sectionID)
        );
        setFilteredSections((prevSections) =>
          prevSections.filter((section) => section.sectionID !== sectionID)
        );
      }
    } catch (error) {
      console.error('Error deleting section:', error.response ? error.response.data : error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilteredSections(
      sections.filter((section) =>
        section[name].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="float-right w-full min-h-screen">
        <h2 className="flex justify-center text-black text-2xl font-bold mt-4">Section Table</h2>
        <div className="mx-8 mt-4">
          <div className="bg-white w-full p-8 rounded-lg shadow-lg">
            {/* Filter Inputs */}
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                name="sectionID"
                placeholder="Filter by Section ID"
                onChange={handleFilterChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="sectionName"
                placeholder="Filter by Section Name"
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
                  <th className="py-2 px-4 border">Section ID</th>
                  <th className="py-2 px-4 border">Section Name</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.length > 0 ? (
                  filteredSections.map((section) => (
                    <tr key={section.sectionID}>
                      <td className="py-2 px-4 border">{section.sectionID}</td>
                      <td className="py-2 px-4 border">{section.sectionName}</td>
                      <td className="py-2 px-4 border text-center">
                        <button
                          className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 ml-2"
                          onClick={() => handleOpenModal(section)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                          onClick={() => handleDeleteSection(section.sectionID, section._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-2 px-4 border text-center">
                      No sections found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Modal for Add/Edit Section */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-xl font-bold mb-4">
                    {isEditMode ? 'Edit Section' : 'Add Section'}
                  </h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Section ID:</label>
                      <input
                        type="text"
                        name="sectionID"
                        value={inputFields.sectionID}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly={isEditMode}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Section Name:</label>
                      <input
                        type="text"
                        name="sectionName"
                        value={inputFields.sectionName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        {isEditMode ? 'Update' : 'Add'}
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
      </div>
    </>
  );
}
