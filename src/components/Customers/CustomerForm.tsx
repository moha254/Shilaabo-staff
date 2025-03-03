import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Customer } from '../../types';

interface CustomerFormProps {
  customerId?: string;
  isEditMode?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customerId, isEditMode = false }) => {
  const { addCustomer, updateCustomer, getCustomerById } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    name: '',
    idNumber: '',
    licenseId: '',
    phoneNumber: ''
  });
  
  // Load customer data if in edit mode
  useEffect(() => {
    if (isEditMode && customerId) {
      const customer = getCustomerById(customerId);
      if (customer) {
        setFormData({
          name: customer.name,
          idNumber: customer.idNumber,
          licenseId: customer.licenseId,
          phoneNumber: customer.phoneNumber
        });
      }
    }
  }, [isEditMode, customerId, getCustomerById]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.idNumber || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isEditMode && customerId) {
      updateCustomer(customerId, formData);
    } else {
      addCustomer(formData);
    }
    
    navigate('/customers');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Customer' : 'New Customer'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Number *
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License ID
            </label>
            <input
              type="text"
              name="licenseId"
              value={formData.licenseId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/customers')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isEditMode ? 'Update Customer' : 'Create Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;