import React, { useState } from 'react';
import Header from '../components/Header';
import BookingList from '../components/Bookings/BookingList';
import { useAppContext } from '../context/AppContext';

const BookingsPage: React.FC = () => {
  const { filterBookings } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBookings = filterBookings(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Bookings" onSearch={handleSearch} />
      
      <div className="p-6">
        <BookingList filteredBookings={filteredBookings} />
      </div>
    </div>
  );
};

export default BookingsPage;