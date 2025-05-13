import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import LoadingAnimation from "../Login/LoadingAnimation";
import { IoIosArrowForward } from 'react-icons/io';
import { api } from '../../api';

export default function DataTable() {
  const [inputFields, setInputFields] = useState({ sectionID: '', sectionName: '' });
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role from localStorage
  const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage.

  // Function to get the token from local storage
  const getToken = () => localStorage.getItem('token');

  // Fetch all sections from the API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${api}/sections`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);
        setSections(response.data.data);
        setFilteredSections(response.data.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      } finally {
        setLoading(false);
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
      setInputFields({ sectionID: '', sectionName: '' });
    }
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputFields({ sectionID: '', sectionName: '' });
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
      <Toaster />
      {loading ? (
        <div>
          <LoadingAnimation />
        </div>
      ) : (
        <div className="float-right w-full min-h-screen">
          <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
            <IoIosArrowForward /> {userRole === 'Admin' ? 'Manage Sections' : 'View Sections'}
          </h2>
          <div className="mx-8 mt-5">
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
                  <th className="py-3 px-4 font-bold uppercase border">Section ID</th>
                  <th className="py-3 px-4 font-bold uppercase border">Section Name</th>
                  {userRole === 'Admin' && (
                    <th className="py-3 px-4 font-bold uppercase border">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredSections.length > 0 ? (
                  filteredSections.map((section) => (
                    <tr key={section.sectionID}>
                      <td className="py-2 px-2 font-semibold border">{section.sectionID}</td>
                      <td className="py-2 px-2 font-semibold border">{section.sectionName}</td>
                      {userRole === 'Admin' && (
                        <td className="py-2 flex justify-center gap-x-8 font-semibold border">
                          <button onClick={() => handleOpenModal(section)}>
                            <MdEdit size={27} className="text-indigo-600 hover:scale-110" />
                          </button>
                          <button onClick={() => handleDeleteSection(section.sectionID, section._id)}>
                            <FaDeleteLeft size={27} className="text-red-600 hover:scale-110" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={userRole === 'Admin' ? 3 : 2} className="py-4 text-center">
                      No sections found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
