import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookingsWithCustomers, deleteBooking } = useAppContext();
  const navigate = useNavigate();
  
  const booking = bookingsWithCustomers.find(b => b.id === id);
  
  if (!booking) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/bookings')}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Bookings</span>
          </button>
        </div>
        <p className="text-center text-gray-500">Booking not found</p>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(booking.id);
      navigate('/bookings');
    }
  };
  
  // Calculate balance
  const balance = booking.totalAmount - booking.amountPaid;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Bookings</span>
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/bookings/edit/${booking.id}`)}
            className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            <Edit size={16} className="mr-1" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            <Trash2 size={16} className="mr-1" />
            <span>Delete</span>
          </button>
          <button
            onClick={() => alert('Invoice download functionality would be implemented here')}
            className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
          >
            <Download size={16} className="mr-1" />
            <span>Invoice</span>
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking #{booking.id}</h2>
        <p className="text-gray-500">Created on {new Date(booking.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Name</span>
              <span className="block text-md font-medium">{booking.customer.name}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">ID Number</span>
              <span className="block text-md font-medium">{booking.customer.idNumber}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">License ID</span>
              <span className="block text-md font-medium">{booking.customer.licenseId || 'N/A'}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Phone Number</span>
              <span className="block text-md font-medium">{booking.customer.phoneNumber}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Car Details</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Car Name</span>
              <span className="block text-md font-medium">{booking.carName}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Number Plate</span>
              <span className="block text-md font-medium">{booking.carNumberPlate}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Destination</span>
              <span className="block text-md font-medium">{booking.destination}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Duration</span>
              <span className="block text-md font-medium">{booking.numberOfDays} days</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Schedule</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Day Out</span>
              <span className="block text-md font-medium">{booking.dayOut}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Date In</span>
              <span className="block text-md font-medium">{booking.dateIn}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Time Out</span>
              <span className="block text-md font-medium">{booking.timeOut || 'N/A'}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Time In</span>
              <span className="block text-md font-medium">{booking.timeIn || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Payment Status</span>
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                booking.paymentStatus === 'Paid' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.paymentStatus}
              </span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Total Amount</span>
              <span className="block text-md font-medium">KSh {booking.totalAmount.toLocaleString()}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Amount Paid</span>
              <span className="block text-md font-medium">KSh {booking.amountPaid.toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Balance</span>
              <span className={`block text-md font-medium ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                KSh {balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
        <p className="text-gray-600 italic">No additional notes for this booking.</p>
      </div>
    </div>
  );
};

export default BookingDetail;