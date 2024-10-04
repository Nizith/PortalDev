import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesCategoryComponent from './SalesCategoryComponent';
import SolutionCategoryComponent from './SolutionCategoryComponent';
import LoadingAnimation from '../Login/LoadingAnimation';

export default function CordinatorComponent() {
  const [activeTab, setActiveTab] = useState('sales'); // Manage active tab


  const [coordinators, setCoordinators] = useState([]);
  const [filteredCoordinators, setFilteredCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coordinators on component mount
  useEffect(() => {
    fetchCoordinators();
  }, []);

  // Fetch all coordinators
  const fetchCoordinators = async () => {
    try {
      const response = await axios.get('http://localhost:4500/portaldev/allcordinator');
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
        <div className="w-full min-h-screen px-8 py-5">
          {/* Tab Buttons */}
          <div className="flex justify-center mb-6">
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
          <div>
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
