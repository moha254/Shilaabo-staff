import React from 'react';
import { Car, Users, Calendar, DollarSign } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const DashboardStats: React.FC = () => {
  const { bookings, customers } = useAppContext();
  
  // Calculate total revenue
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amountPaid, 0);
  
  // Calculate pending payments
  const pendingPayments = bookings
    .filter(booking => booking.paymentStatus === 'Pending')
    .reduce((sum, booking) => sum + (booking.totalAmount - booking.amountPaid), 0);
  
  // Count active bookings (assuming bookings with dateIn in the future are active)
  const activeBookings = bookings.filter(
    booking => new Date(booking.dateIn) >= new Date()
  ).length;

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length,
      icon: <Users size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Bookings',
      value: activeBookings,
      icon: <Calendar size={24} className="text-green-500" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Revenue',
      value: `KSh ${totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={24} className="text-purple-500" />,
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Pending Payments',
      value: `KSh ${pendingPayments.toLocaleString()}`,
      icon: <Car size={24} className="text-orange-500" />,
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>{stat.icon}</div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;