import React from 'react';
import Header from '../components/Header';
import CustomerList from '../components/Customers/CustomerList';

const CustomersPage: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Customers" />
      
      <div className="p-6">
        <CustomerList />
      </div>
    </div>
  );
};

export default CustomersPage;