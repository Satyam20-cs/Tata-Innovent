'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { enginePerformanceData } from '@/lib/data';

export function EnginePerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart data={enginePerformanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)', 
            }}
          />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="power" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Power (kW)" dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Efficiency (%)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
