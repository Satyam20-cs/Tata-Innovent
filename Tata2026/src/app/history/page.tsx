'use client'

import AppHeader from '@/components/layout/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { historicalData, vehicles } from '@/lib/data';
import React, { useEffect, useState } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
]

export default function HistoryPage() {
    const [selectedVehicles, setSelectedVehicles] = useState<string[]>(['1']);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        if (!selectedVehicles.length) {
            setChartData([]);
            return;
        };
        
        const days = Array.from({length: 30}, (_, i) => i + 1);
        
        const newChartData = days.map(day => {
            const entry: { day: number; [key: string]: number } = { day };
            selectedVehicles.forEach(id => {
                const vehicleData = historicalData[id as keyof typeof historicalData];
                const dayData = vehicleData?.find(d => d.day === day);
                if(dayData) {
                    entry[`Vehicle ${id}`] = parseFloat(dayData.efficiency.toFixed(2));
                }
            });
            return entry;
        });
        setChartData(newChartData);

    }, [selectedVehicles]);

    const handleCheckedChange = (vehicleId: string) => {
        setSelectedVehicles(prev => 
            prev.includes(vehicleId)
                ? prev.filter(id => id !== vehicleId)
                : [...prev, vehicleId]
        );
    }

  return (
    <div className="flex flex-col">
      <AppHeader title="Historical Analysis" />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card>
            <CardHeader>
                <CardTitle>Fleet Efficiency Comparison</CardTitle>
                <CardDescription>Compare the historical battery efficiency of vehicles in your fleet over the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 flex flex-wrap gap-4">
                    <p className="font-medium text-sm self-center">Compare Vehicles:</p>
                    {vehicles.map(vehicle => (
                        <div key={vehicle.id} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`vehicle-${vehicle.id}`} 
                                checked={selectedVehicles.includes(vehicle.id)}
                                onCheckedChange={() => handleCheckedChange(vehicle.id)}
                            />
                            <label
                                htmlFor={`vehicle-${vehicle.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {vehicle.make} {vehicle.model}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}/>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                borderColor: 'hsl(var(--border))',
                                borderRadius: 'var(--radius)', 
                            }}
                        />
                        <Legend />
                        {selectedVehicles.map((id, index) => (
                           <Line key={id} type="monotone" dataKey={`Vehicle ${id}`} stroke={colors[index % colors.length]} strokeWidth={2} name={`${vehicles.find(v=>v.id === id)?.make} ${vehicles.find(v=>v.id === id)?.model}`} />
                        ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
