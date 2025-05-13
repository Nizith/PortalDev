import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesCategoryComponent from './SalesCategoryComponent';
import SolutionCategoryComponent from './SolutionCategoryComponent';
import LoadingAnimation from '../Login/LoadingAnimation';
import { IoIosArrowForward } from 'react-icons/io';
import { api } from '../../api';

export default function CordinatorComponent() {
  const [activeTab, setActiveTab] = useState('sales'); // Manage active tab


  const [coordinators, setCoordinators] = useState([]);
  const [filteredCoordinators, setFilteredCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user role from localStorage
  const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage.

  // Function to get the token from local storage
  const getToken = () => localStorage.getItem('token');

  // Fetch coordinators on component mount
  useEffect(() => {
    fetchCoordinators();
  }, []);

  // Fetch all coordinators
  const fetchCoordinators = async () => {
    try {
      const response = await axios.get(`${api}/allcordinator`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setCoordinators(response.data.data);
      setFilteredCoordinators(response.data.data); // Initialize filtered list with full data

      // Simulate minimum 2-second loading time
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));

      // Wait for both data fetch and 2 seconds delay
      await Promise.all([delay, response]);
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    } finally {
      setLoading(false); // Stop the loading animation after both conditions are met
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <LoadingAnimation />
        </div>
      ) : (
        <div className="w-full min-h-screen">
          <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
            <IoIosArrowForward /> {userRole === 'Admin' ? 'Manage Cordinators' : 'View Cordinators'}
          </h2>
          {/* Tab Buttons */}
          <div className="flex justify-center mb-6 mx-8 mt-5">
            <button
              className={`w-full px-6 py-2 rounded-t-lg ${activeTab === 'sales' ? 'bg-gradient-to-r from-slate-900 to-indigo-600 text-white font-bold' : 'bg-gray-200'
                }  transition`}
              onClick={() => setActiveTab('sales')}
            >
              Sales Category
            </button>
            <button
              className={`w-full px-6 py-2 rounded-t-lg ml-2 ${activeTab === 'solution' ? 'bg-gradient-to-r from-slate-900 to-indigo-600 text-white font-bold' : 'bg-gray-200'
                }  transition`}
              onClick={() => setActiveTab('solution')}
            >
              Solution Category
            </button>
          </div>

          {/* Tab Content */}
          <div className='mx-8 mt-5'>
            {activeTab === 'sales' && (
              <div>
                <SalesCategoryComponent
                  fetchCoordinators={fetchCoordinators}
                  coordinators={coordinators}
                  filteredCoordinators={filteredCoordinators}
                  setFilteredCoordinators={setFilteredCoordinators} />
              </div>
            )}
            {activeTab === 'solution' && (
              <div>

                <SolutionCategoryComponent
                  fetchCoordinators={fetchCoordinators}
                  coordinators={coordinators}
                  filteredCoordinators={filteredCoordinators}
                  setFilteredCoordinators={setFilteredCoordinators} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
