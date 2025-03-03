export interface Customer {
  id: string;
  name: string;
  idNumber: string;
  licenseId: string;
  phoneNumber: string;
}

export interface Booking {
  id: string;
  customerId: string;
  carName: string;
  carNumberPlate: string;
  destination: string;
  numberOfDays: number;
  dayOut: string;
  dateIn: string;
  timeOut: string;
  timeIn: string;
  paymentStatus: 'Paid' | 'Pending';
  amountPaid: number;
  totalAmount: number;
  createdAt: string;
}

export type BookingWithCustomer = Booking & {
  customer: Customer;
};

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'staff';
}