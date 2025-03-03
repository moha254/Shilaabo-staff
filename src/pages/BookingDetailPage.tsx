import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import BookingDetail from '../components/Bookings/BookingDetail';

const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Booking Details" />
      
      <div className="p-6">
        <BookingDetail />
      </div>
    </div>
  );
};

export default BookingDetailPage;