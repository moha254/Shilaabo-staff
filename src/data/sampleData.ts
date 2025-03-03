import { Customer, Booking, User } from '../types';

export const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    idNumber: 'ID12345678',
    licenseId: 'DL98765432',
    phoneNumber: '+254712345678'
  },
  {
    id: '2',
    name: 'Jane Smith',
    idNumber: 'ID87654321',
    licenseId: 'DL12345678',
    phoneNumber: '+254723456789'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    idNumber: 'ID45678901',
    licenseId: 'DL56789012',
    phoneNumber: '+254734567890'
  }
];

export const sampleBookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    carName: 'Toyota Land Cruiser',
    carNumberPlate: 'KCB 123A',
    destination: 'Maasai Mara',
    numberOfDays: 3,
    dayOut: '2025-01-15',
    dateIn: '2025-01-18',
    timeOut: '08:00',
    timeIn: '18:00',
    paymentStatus: 'Paid',
    amountPaid: 45000,
    totalAmount: 45000,
    createdAt: '2025-01-10T10:30:00Z'
  },
  {
    id: '2',
    customerId: '2',
    carName: 'Nissan Patrol',
    carNumberPlate: 'KDG 456B',
    destination: 'Amboseli',
    numberOfDays: 2,
    dayOut: '2025-01-20',
    dateIn: '2025-01-22',
    timeOut: '09:00',
    timeIn: '17:00',
    paymentStatus: 'Pending',
    amountPaid: 15000,
    totalAmount: 30000,
    createdAt: '2025-01-12T14:45:00Z'
  },
  {
    id: '3',
    customerId: '3',
    carName: 'Toyota Prado',
    carNumberPlate: 'KCF 789C',
    destination: 'Nakuru',
    numberOfDays: 1,
    dayOut: '2025-01-25',
    dateIn: '2025-01-26',
    timeOut: '10:00',
    timeIn: '16:00',
    paymentStatus: 'Paid',
    amountPaid: 15000,
    totalAmount: 15000,
    createdAt: '2025-01-14T09:15:00Z'
  }
];

export const sampleUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    username: 'staff',
    password: 'staff123',
    name: 'Staff User',
    role: 'staff'
  }
];