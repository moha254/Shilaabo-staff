import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CustomerDetail from '../components/Customers/CustomerDetail';

const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Customer Details" />
      
      <div className="p-6">
        <CustomerDetail />
      </div>
    </div>
  );
};

export default CustomerDetailPage;