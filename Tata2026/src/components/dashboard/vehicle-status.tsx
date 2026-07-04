'use client';

import { BatteryCharging, Droplets, Thermometer, Gauge } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const statusMetrics = [
  {
    label: 'Engine Temp',
    value: 75,
    unit: '°C',
    icon: Thermometer,
    color: 'bg-green-500',
  },
  {
    label: 'Oil Pressure',
    value: 80,
    unit: 'PSI',
    icon: Droplets,
    color: 'bg-blue-500',
  },
  {
    label: 'Battery Level',
    value: 92,
    unit: '%',
    icon: BatteryCharging,
    color: 'bg-yellow-500',
  },
  {
    label: 'Power Output',
    value: 65,
    unit: 'kW',
    icon: Gauge,
    color: 'bg-purple-500',
  },
];

export function VehicleStatus() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statusMetrics.map((metric) => (
        <div key={metric.label} className="flex flex-col items-center text-center gap-2">
            <metric.icon className="w-8 h-8 text-muted-foreground" />
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            <p className="text-sm font-medium">{metric.label}</p>
            <Progress value={metric.value} className="h-2 w-full" indicatorClassName={metric.color} />
        </div>
      ))}
    </div>
  );
}

declare module "react" {
    interface ComponentProps<T> {
        indicatorClassName?: string
    }
}
