'use client';

import AppHeader from '@/components/layout/app-header';
import { vehicles as initialVehicles } from '@/lib/data';
import { VehicleTable } from '@/components/vehicles/vehicle-table';
import { AddVehicleDialog } from '@/components/vehicles/add-vehicle-dialog';
import React, { useState } from 'react';
import type { Vehicle } from '@/lib/types';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId));
  };

  return (
    <div className="flex flex-col">
      <AppHeader title="Vehicle Fleet" />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex justify-end">
          <AddVehicleDialog />
        </div>
        <VehicleTable vehicles={vehicles} onDeleteVehicle={handleDeleteVehicle} />
      </div>
    </div>
  );
}
