import { AppointmentRecord } from '../types';

export const initialAppointments: AppointmentRecord[] = [
  {
    id: 'apt-1',
    customerName: 'Tariq Al-Mansoori',
    phone: '+971 50 823 4912',
    email: 'tariq.m@gmail.com',
    serviceId: 'cut-mens',
    serviceName: "Men's Haircut",
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '11:00 AM',
    category: 'haircuts',
    numberOfGuests: 1,
    specialRequest: 'Low fade on sides with scissors top',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'apt-2',
    customerName: 'Rashid Khan',
    phone: '+971 52 918 2736',
    email: 'rashid.k@yahoo.com',
    serviceId: 'beard-trim',
    serviceName: 'Beard Trim & Edging',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '03:00 PM',
    category: 'beard',
    numberOfGuests: 1,
    specialRequest: 'Sharp razor line on cheeks',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'apt-3',
    customerName: 'Mohammed Abdullah',
    phone: '+971 55 432 1098',
    email: 'm.abdullah@hotmail.com',
    serviceId: 'shave-hottowel',
    serviceName: 'Hot Towel Shave',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '06:30 PM',
    category: 'shaving',
    numberOfGuests: 1,
    specialRequest: 'Sensitive skin shave oil',
    status: 'Pending',
    createdAt: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 'apt-4',
    customerName: 'Vikram Sharma',
    phone: '+971 56 123 9876',
    email: 'vikram.s@outlook.com',
    serviceId: 'combo-hair-beard',
    serviceName: 'Haircut & Beard Trim Combo',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '01:00 PM',
    category: 'haircuts',
    numberOfGuests: 1,
    specialRequest: '',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'apt-5',
    customerName: 'Ahmed Hassan',
    phone: '+971 50 555 7890',
    email: 'ahmed.h@gmail.com',
    serviceId: 'cut-mens',
    serviceName: "Men's Haircut",
    preferredDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    preferredTime: '05:00 PM',
    category: 'haircuts',
    numberOfGuests: 1,
    specialRequest: '',
    status: 'Completed',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];
