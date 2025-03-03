import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { customers, bookingsWithCustomers, deleteCustomer } = useAppContext();
  const navigate = useNavigate();
  
  const customer = customers.find(c => c.id === id);
  
  if (!customer) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/customers')}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Customers</span>
          </button>
        </div>
        <p className="text-center text-gray-500">Customer not found</p>
      </div>
    );
  }
  
  // Get customer's bookings
  const customerBookings = bookingsWithCustomers.filter(b => b.customerId === customer.id);
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this customer? This will also delete all associated bookings.')) {
      deleteCustomer(customer.id);
      navigate('/customers');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/customers')}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Customers</span>
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/customers/edit/${customer.id}`)}
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
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{customer.name}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-3">
              <span className="block text-sm text-gray-500">ID Number</span>
              <span className="block text-md font-medium">{customer.idNumber}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">License ID</span>
              <span className="block text-md font-medium">{customer.licenseId || 'N/A'}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Phone Number</span>
              <span className="block text-md font-medium">{customer.phoneNumber}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Total Bookings</span>
              <span className="block text-md font-medium">{customerBookings.length}</span>
            </div>
            <div className="mb-3">
              <span className="block text-sm text-gray-500">Completed Bookings</span>
              <span className="block text-md font-medium">
                {customerBookings.filter(b => new Date(b.dateIn) < new Date()).length}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Upcoming Bookings</span>
              <span className="block text-md font-medium">
                {customerBookings.filter(b => new Date(b.dateIn) >= new Date()).length}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Booking History</h3>
          <button
            onClick={() => navigate('/bookings/new', { state: { customerId: customer.id } })}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <Calendar size={16} className="mr-1" />
            <span>New Booking</span>
          </button>
        </div>
        
        {customerBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/bookings/${booking.id}`)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.carName}</div>
                      <div className="text-sm text-gray-500">{booking.carNumberPlate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.destination}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.dayOut} to {booking.dateIn}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.paymentStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/bookings/${booking.id}`);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No bookings found for this customer</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;