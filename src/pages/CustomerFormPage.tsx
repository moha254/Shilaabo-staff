import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CustomerForm from '../components/Customers/CustomerForm';

const CustomerFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title={isEditMode ? "Edit Customer" : "New Customer"} />
      
      <div className="p-6">
        <CustomerForm customerId={id} isEditMode={isEditMode} />
      </div>
    </div>
  );
};

export default CustomerFormPage;