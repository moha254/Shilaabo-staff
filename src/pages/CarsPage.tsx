import React from 'react';
import Header from '../components/Header';

const CarsPage: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Cars" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Car Management</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            This feature is coming soon. You'll be able to manage your fleet of vehicles here.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => alert('This feature is under development')}
          >
            Notify Me When Available
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;