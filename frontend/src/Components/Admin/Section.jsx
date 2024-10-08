import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import LoadingAnimation from '../Login/LoadingAnimation';

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
  const [loading, setLoading] = useState(true);


  // Fetch all sections from the API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:4500/portaldev/readsection');
        setSections(response.data.data); // Assuming response.data.data contains the list of sections
        setFilteredSections(response.data.data); // Set filtered sections initially to all sections

        
        // Simulate minimum 2-second loading time
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));

        // Wait for both data fetch and 2 seconds delay
        await Promise.all([delay, response]);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }finally {
        setLoading(false); // Stop the loading animation after both conditions are met
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
          `http://localhost:4500/portaldev/updatesection/${selectedSection._id}`, // Assuming _id is the identifier field
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
        setSections((prevSections) => [...prevSections, response.data.data]);
        setFilteredSections((prevSections) => [...prevSections, response.data.data]);
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
    <>{loading ? (
      <>
        <LoadingAnimation />
      </>
    ) : (
      <div className="float-right w-full min-h-screen">
        <h2 className="flex justify-center text-black text-2xl font-bold mt-4 ">Section Table</h2>
        <div className="mx-8 my-5">
          <div>
            {/* Filter Inputs */}
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                name="sectionID"
                placeholder="Filter by Section ID"
                onChange={handleFilterChange}
                className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
              />
              <input
                type="text"
                name="sectionName"
                placeholder="Filter by Section Name"
                onChange={handleFilterChange}
                className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-green-600"
              />
              <button
                className="bg-green-800 hover:ring-2 ring-green-500 text-green-200 font-semibold px-5 py-2 rounded-lg duration-200"
                onClick={() => handleOpenModal()}
              >
                New
              </button>
            </div>

            <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                  <th className="py-4 px-4 font-bold uppercase borderr">Section ID</th>
                  <th className="py-4 px-4 font-bold uppercase borderr">Section Name</th>
                  <th className="py-4 px-4 font-bold uppercase borderr">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.length > 0 ? (
                  filteredSections.map((section) => (
                    <tr key={section.sectionID} className='hover:bg-gray-200 transition-all duration-300 ease-in-out'>
                      <td className="py-4 px-4 font-semibold border">{section.sectionID}</td>
                      <td className="py-4 px-4 font-semibold border">{section.sectionName}</td>
                      <td className="py-4 px-2 font-semibold border text-center space-x-6">
                        <button onClick={() => handleOpenModal(section)} >
                          <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                        </button>
                        <button onClick={() => handleDeleteSection(section.sectionID, section._id)} >
                          <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
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
        </div>
      </div>
    )}
    </>
  );
}
