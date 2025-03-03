import React from 'react';
import Header from '../components/Header';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentBookings from '../components/Dashboard/RecentBookings';
import BookingChart from '../components/Dashboard/BookingChart';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Dashboard" />
      
      <div className="p-6">
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingChart />
          <RecentBookings />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;