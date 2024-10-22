import { Dispatch, SetStateAction } from 'react';

export const detectUserLocation = (): Promise<[number, number]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([12.8231, 80.0442]); // SRM KTR, Potheri, India
    }, 1000);
  });
};

export const estimateFare = (from: string, to: string, cabType: string): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseFare = Math.floor(Math.random() * 200) + 100; // Base fare in rupees
      const multiplier = cabType === 'Economy' ? 1 : cabType === 'Premium' ? 1.5 : 2;
      resolve(Math.round(baseFare * multiplier));
    }, 1000);
  });
};

export const assignDriver = (from: string, to: string, cabType: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        name: 'Rajesh Kumar',
        rating: 4.8,
        carModel: 'Maruti Suzuki Swift',
        licensePlate: 'TN 07 AK 1234',
      });
    }, 1500);
  });
};

export const trackDriver = (driverId: number, setDriverLocation: Dispatch<SetStateAction<[number, number] | null>>) => {
  const interval = setInterval(() => {
    const lat = 12.8231 + (Math.random() - 0.5) * 0.01;
    const lng = 80.0442 + (Math.random() - 0.5) * 0.01;
    setDriverLocation([lat, lng]);
  }, 3000);

  return () => clearInterval(interval);
};