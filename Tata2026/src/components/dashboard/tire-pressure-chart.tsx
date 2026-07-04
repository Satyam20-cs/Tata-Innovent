'use client';

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { tirePressureData } from '@/lib/data';

const OPTIMAL_PRESSURE = 35;

export function TirePressureChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart data={tirePressureData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
           <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip 
            cursor={{fill: 'hsl(var(--secondary))'}}
            contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)', 
            }}
          />
          <ReferenceLine y={OPTIMAL_PRESSURE} label={{ value: 'Optimal', position: 'insideTopRight', fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--accent))" strokeDasharray="3 3" />
          <Bar dataKey="pressure" name="Pressure (PSI)" fill="url(#colorUv)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
