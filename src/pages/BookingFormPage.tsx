import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import BookingForm from '../components/Bookings/BookingForm';

const BookingFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title={isEditMode ? "Edit Booking" : "New Booking"} />
      
      <div className="p-6">
        <BookingForm bookingId={id} isEditMode={isEditMode} />
      </div>
    </div>
  );
};

export default BookingFormPage;