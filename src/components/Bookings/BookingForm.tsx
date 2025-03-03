import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Booking, Customer } from '../../types';

interface BookingFormProps {
  bookingId?: string;
  isEditMode?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ bookingId, isEditMode = false }) => {
  const { 
    customers, 
    addBooking, 
    updateBooking, 
    getBookingById,
    addCustomer
  } = useAppContext();
  const navigate = useNavigate();
  
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  
  // New customer form state
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    idNumber: '',
    licenseId: '',
    phoneNumber: ''
  });
  
  // Booking form state
  const [formData, setFormData] = useState<Omit<Booking, 'id' | 'customerId' | 'createdAt'>>({
    carName: '',
    carNumberPlate: '',
    destination: '',
    numberOfDays: 1,
    dayOut: '',
    dateIn: '',
    timeOut: '',
    timeIn: '',
    paymentStatus: 'Pending',
    amountPaid: 0,
    totalAmount: 0
  });
  
  // Load booking data if in edit mode
  useEffect(() => {
    if (isEditMode && bookingId) {
      const booking = getBookingById(bookingId);
      if (booking) {
        setSelectedCustomerId(booking.customerId);
        setFormData({
          carName: booking.carName,
          carNumberPlate: booking.carNumberPlate,
          destination: booking.destination,
          numberOfDays: booking.numberOfDays,
          dayOut: booking.dayOut,
          dateIn: booking.dateIn,
          timeOut: booking.timeOut,
          timeIn: booking.timeIn,
          paymentStatus: booking.paymentStatus,
          amountPaid: booking.amountPaid,
          totalAmount: booking.totalAmount
        });
      }
    }
  }, [isEditMode, bookingId, getBookingById]);
  
  // Calculate date in based on day out and number of days
  useEffect(() => {
    if (formData.dayOut && formData.numberOfDays > 0) {
      const dayOut = new Date(formData.dayOut);
      const dateIn = new Date(dayOut);
      dateIn.setDate(dayOut.getDate() + formData.numberOfDays);
      
      // Format date to YYYY-MM-DD
      const formattedDateIn = dateIn.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, dateIn: formattedDateIn }));
    }
  }, [formData.dayOut, formData.numberOfDays]);
  
  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowNewCustomerForm(true);
      setSelectedCustomerId('');
    } else {
      setSelectedCustomerId(value);
      setShowNewCustomerForm(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let customerId = selectedCustomerId;
    
    // If creating a new customer
    if (showNewCustomerForm) {
      // Validate new customer form
      if (!newCustomer.name || !newCustomer.idNumber || !newCustomer.phoneNumber) {
        alert('Please fill in all required customer fields');
        return;
      }
      
      // Add new customer and get the ID
      const customer = addCustomer(newCustomer);
      customerId = customer.id;
    }
    
    // Validate booking form
    if (!customerId || !formData.carName || !formData.carNumberPlate || 
        !formData.destination || !formData.dayOut || !formData.dateIn) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isEditMode && bookingId) {
      updateBooking(bookingId, formData);
    } else {
      addBooking({
        ...formData,
        customerId
      });
    }
    
    navigate('/bookings');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Booking' : 'New Booking'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Customer Information</h3>
          
          {!isEditMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Customer
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCustomerId}
                onChange={handleCustomerChange}
                disabled={isEditMode}
              >
                <option value="">-- Select a customer --</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.phoneNumber}
                  </option>
                ))}
                <option value="new">+ Add New Customer</option>
              </select>
            </div>
          )}
          
          {showNewCustomerForm && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="text-md font-medium text-gray-700 mb-3">New Customer Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCustomer.name}
                    onChange={handleNewCustomerChange}
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
                    value={newCustomer.idNumber}
                    onChange={handleNewCustomerChange}
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
                    value={newCustomer.licenseId}
                    onChange={handleNewCustomerChange}
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
                    value={newCustomer.phoneNumber}
                    onChange={handleNewCustomerChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Car Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Name *
              </label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number Plate *
              </label>
              <input
                type="text"
                name="carNumberPlate"
                value={formData.carNumberPlate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Booking Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Days *
              </label>
              <input
                type="number"
                name="numberOfDays"
                min="1"
                value={formData.numberOfDays}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day Out *
              </label>
              <input
                type="date"
                name="dayOut"
                value={formData.dayOut}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date In
              </label>
              <input
                type="date"
                name="dateIn"
                value={formData.dateIn}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Out
              </label>
              <input
                type="time"
                name="timeOut"
                value={formData.timeOut}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time In
              </label>
              <input
                type="time"
                name="timeIn"
                value={formData.timeIn}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Amount (KSh)
              </label>
              <input
                type="number"
                name="totalAmount"
                min="0"
                value={formData.totalAmount}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Paid (KSh)
              </label>
              <input
                type="number"
                name="amountPaid"
                min="0"
                max={formData.totalAmount}
                value={formData.amountPaid}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/bookings')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isEditMode ? 'Update Booking' : 'Create Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;