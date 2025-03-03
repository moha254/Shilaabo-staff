import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Booking, BookingWithCustomer } from '../types';

// Sample data
import { sampleCustomers, sampleBookings } from '../data/sampleData';

interface AppContextType {
  customers: Customer[];
  bookings: Booking[];
  bookingsWithCustomers: BookingWithCustomer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getCustomerById: (id: string) => Customer | undefined;
  getBookingById: (id: string) => Booking | undefined;
  filterBookings: (query: string) => BookingWithCustomer[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const savedCustomers = localStorage.getItem('customers');
    return savedCustomers ? JSON.parse(savedCustomers) : sampleCustomers;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : sampleBookings;
  });

  // Combine bookings with customer data
  const bookingsWithCustomers: BookingWithCustomer[] = bookings.map(booking => {
    const customer = customers.find(c => c.id === booking.customerId);
    return {
      ...booking,
      customer: customer || {
        id: 'unknown',
        name: 'Unknown Customer',
        idNumber: 'N/A',
        licenseId: 'N/A',
        phoneNumber: 'N/A'
      }
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id: string, customerData: Partial<Customer>) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id ? { ...customer, ...customerData } : customer
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    // Also delete associated bookings
    setBookings(prev => prev.filter(booking => booking.customerId !== id));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const updateBooking = (id: string, bookingData: Partial<Booking>) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, ...bookingData } : booking
      )
    );
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getCustomerById = (id: string) => {
    return customers.find(customer => customer.id === id);
  };

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  const filterBookings = (query: string): BookingWithCustomer[] => {
    if (!query.trim()) return bookingsWithCustomers;
    
    const lowerQuery = query.toLowerCase();
    return bookingsWithCustomers.filter(booking => 
      booking.customer.name.toLowerCase().includes(lowerQuery) ||
      booking.carName.toLowerCase().includes(lowerQuery) ||
      booking.carNumberPlate.toLowerCase().includes(lowerQuery) ||
      booking.destination.toLowerCase().includes(lowerQuery) ||
      booking.paymentStatus.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <AppContext.Provider
      value={{
        customers,
        bookings,
        bookingsWithCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addBooking,
        updateBooking,
        deleteBooking,
        getCustomerById,
        getBookingById,
        filterBookings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};