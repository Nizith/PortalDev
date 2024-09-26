import React, { useState } from 'react';
import SalesCategoryComponent from './SalesCategoryComponent';
import SolutionCategoryComponent from './SolutionCategoryComponent';

export default function Jojo() {
  const [activeTab, setActiveTab] = useState('sales'); // Manage active tab

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Tab Buttons */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'sales' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          } hover:bg-blue-400 transition`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ml-2 ${
            activeTab === 'solution' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          } hover:bg-blue-400 transition`}
          onClick={() => setActiveTab('solution')}
        >
          Solution
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {activeTab === 'sales' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sales Category</h2>
            <SalesCategoryComponent />
          </div>
        )}
        {activeTab === 'solution' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Solution Category</h2>
            <SolutionCategoryComponent />
          </div>
        )}
      </div>
    </div>
  );
}
