import type { Vehicle, Alert } from './types';
import { PlaceHolderImages } from './placeholder-images';

const carImage1 = PlaceHolderImages.find((img) => img.id === 'car-profile-1');
const carImage2 = PlaceHolderImages.find((img) => img.id === 'car-profile-2');
const carImage3 = PlaceHolderImages.find((img) => img.id === 'car-profile-3');
const carImage4 = PlaceHolderImages.find((img) => img.id === 'car-profile-4');
const carImage5 = PlaceHolderImages.find((img) => img.id === 'car-profile-5');

export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    vin: '5YJSA1E2XPFXXXXXX',
    status: 'Operational',
    imageUrl: carImage1?.imageUrl || '',
    imageHint: carImage1?.imageHint || 'modern car',
  },
  {
    id: '2',
    make: 'Ford',
    model: 'F-150 Lightning',
    year: 2022,
    vin: '1FTVW1EL5NKXXXXXX',
    status: 'Needs Attention',
    imageUrl: carImage2?.imageUrl || '',
    imageHint: carImage2?.imageHint || 'SUV car',
  },
  {
    id: '3',
    make: 'Rivian',
    model: 'R1T',
    year: 2024,
    vin: '7FCTG1C19RGXXXXXX',
    status: 'Operational',
    imageUrl: carImage3?.imageUrl || '',
    imageHint: carImage3?.imageHint || 'electric car',
  },
   {
    id: '4',
    make: 'Lucid',
    model: 'Air',
    year: 2023,
    vin: '5L1SM1E2XPFXXXXXX',
    status: 'Operational',
    imageUrl: carImage4?.imageUrl || '',
    imageHint: carImage4?.imageHint || 'luxury sedan',
  },
  {
    id: '5',
    make: 'Chevrolet',
    model: 'Bolt EV',
    year: 2022,
    vin: '1G1FY1E2XNXXXXXXX',
    status: 'Out of Service',
    imageUrl: carImage5?.imageUrl || '',
    imageHint: carImage5?.imageHint || 'compact hatchback',
  },
];

export const alerts: Alert[] = [
    {
        id: '1',
        vehicleId: '2',
        message: 'Low tire pressure in front-left tire.',
        severity: 'Medium',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        vehicleId: '5',
        message: 'Charging system fault. Vehicle is not charging.',
        severity: 'High',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        vehicleId: '2',
        message: 'Battery coolant level is low.',
        severity: 'High',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '4',
        vehicleId: '1',
        message: 'Software update available.',
        severity: 'Low',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '5',
        vehicleId: '4',
        message: 'Right headlight bulb needs replacement.',
        severity: 'Low',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    }
]

export const enginePerformanceData = [
    { time: '12:00', power: 120, efficiency: 85 },
    { time: '12:01', power: 121, efficiency: 85.2 },
    { time: '12:02', power: 122, efficiency: 85.5 },
    { time: '12:03', power: 123, efficiency: 85.3 },
    { time: '12:04', power: 125, efficiency: 84 },
    { time: '12:05', power: 124, efficiency: 84.2 },
    { time: '12:06', power: 123, efficiency: 84.5 },
    { time: '12:07', power: 126, efficiency: 85.1 },
    { time: '12:08', power: 128, efficiency: 86 },
    { time: '12:09', power: 129, efficiency: 86.1 },
    { time: '12:10', power: 130, efficiency: 86 },
    { time: '12:11', power: 131, efficiency: 85.9 },
    { time: '12:12', power: 132, efficiency: 85.8 },
    { time: '12:13', power: 130, efficiency: 85.4 },
    { time: '12:14', power: 128, efficiency: 85 },
    { time: '12:15', power: 132, efficiency: 86.5 },
    { time: '12:16', power: 135, efficiency: 87 },
    { time: '12:17', power: 136, efficiency: 87.1 },
    { time: '12:18', power: 134, efficiency: 87.2 },
    { time: '12:19', power: 138, efficiency: 87.8 },
    { time: '12:20', power: 140, efficiency: 88 },
    { time: '12:21', power: 139, efficiency: 87.9 },
    { time: '12:22', power: 138, efficiency: 87.5 },
    { time: '12:23', power: 137, efficiency: 87.0 },
    { time: '12:24', power: 136, efficiency: 86.5 },
    { time: '12:25', power: 140, efficiency: 88.0 },
    { time: '12:26', power: 142, efficiency: 88.5 },
    { time: '12:27', power: 141, efficiency: 88.2 },
    { time: '12:28', power: 140, efficiency: 88 },
    { time: '12:29', power: 139, efficiency: 87.5 },
    { time: '12:30', power: 138, efficiency: 86 },
  ];

export const tirePressureData = [
    { name: 'Front Left', pressure: 33 },
    { name: 'Front Right', pressure: 35 },
    { name: 'Rear Left', pressure: 35 },
    { name: 'Rear Right', pressure: 34 },
    { name: 'Vehicle 2 FL', pressure: 32 },
    { name: 'Vehicle 2 FR', pressure: 33 },
    { name: 'Vehicle 2 RL', pressure: 34 },
    { name: 'Vehicle 2 RR', pressure: 34 },
]

export const historicalData = {
    '1': Array.from({ length: 30 }, (_, i) => ({ day: i + 1, efficiency: 85 + Math.random() * 5 - 2.5 })),
    '2': Array.from({ length: 30 }, (_, i) => ({ day: i + 1, efficiency: 82 + Math.random() * 6 - 3 })),
    '3': Array.from({ length: 30 }, (_, i) => ({ day: i + 1, efficiency: 90 + Math.random() * 4 - 2 })),
    '4': Array.from({ length: 30 }, (_, i) => ({ day: i + 1, efficiency: 88 + Math.random() * 5 - 2 })),
    '5': Array.from({ length: 30 }, (_, i) => ({ day: i + 1, efficiency: 79 + Math.random() * 7 - 4 })),
}
