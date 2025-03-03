import React from 'react';
import { useAppContext } from '../../context/AppContext';

const BookingChart: React.FC = () => {
  const { bookings } = useAppContext();
  
  // Get current month and year
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get last 6 months (including current)
  const months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
    return { monthIndex, year };
  }).reverse();
  
  // Format month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Count bookings per month
  const bookingsPerMonth = months.map(({ monthIndex, year }) => {
    const count = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate.getMonth() === monthIndex && bookingDate.getFullYear() === year;
    }).length;
    
    return {
      month: `${monthNames[monthIndex]} ${year}`,
      count,
      // Calculate percentage for bar height (max 100%)
      percentage: count > 0 ? Math.min(count * 10, 100) : 5 // At least 5% height for visibility
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Booking Trends</h2>
      
      <div className="flex items-end justify-between h-64">
        {bookingsPerMonth.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500 mb-1">{data.count}</div>
            <div 
              className="w-full max-w-[40px] bg-blue-500 rounded-t-md mx-auto"
              style={{ height: `${data.percentage}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-2">{data.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingChart;