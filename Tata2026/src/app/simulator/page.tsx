
'use client';

import AppHeader from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo, useActionState } from 'react';
import { DrivingVideo } from '@/components/simulator/driving-video';
import { Beaker, FileText, Mountain, Sun, Trees, Car } from 'lucide-react';
import { runSimulationAction } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

type DrivingCondition = 'highway' | 'city' | 'off-road';
type VehicleType = 'suv' | 'sedan' | 'truck';

const simulationSchema = z.object({
  drivingCondition: z.enum(['highway', 'city', 'off-road']),
  vehicleType: z.enum(['suv', 'sedan', 'truck']),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
});

const initialState = {
  result: null,
  error: null,
};

export default function SimulatorPage() {
  const [selectedCondition, setSelectedCondition] = useState<DrivingCondition>('city');
  const [state, formAction] = useActionState(runSimulationAction, initialState);

  const form = useForm<z.infer<typeof simulationSchema>>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      drivingCondition: 'city',
      vehicleType: 'suv',
      duration: 60,
    },
  });

  const conditionDetails = useMemo(() => {
    switch (selectedCondition) {
      case 'highway':
        return {
          icon: Sun,
          title: 'Highway Driving',
          description: 'Simulating long-distance travel at high speeds with minimal stops.',
        };
      case 'city':
        return {
          icon: Trees,
          title: 'City Driving',
          description: 'Simulating stop-and-go traffic, frequent braking, and lower speeds.',
        };
      case 'off-road':
        return {
          icon: Mountain,
          title: 'Off-Road Adventure',
          description: 'Simulating rough terrain, steep inclines, and variable traction.',
        };
    }
  }, [selectedCondition]);

  function handleFormSubmit(data: z.infer<typeof simulationSchema>) {
    const formData = new FormData();
    formData.append('drivingCondition', data.drivingCondition);
    formData.append('vehicleType', data.vehicleType);
    formData.append('duration', data.duration.toString());
    formAction(formData);
    setSelectedCondition(data.drivingCondition);
  }

  return (
    <div className="flex flex-col h-dvh">
      <AppHeader title="Driving Simulator" />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 relative flex flex-col items-center justify-center bg-black overflow-hidden">
           <DrivingVideo condition={selectedCondition} />
        </div>
        <div className="lg:col-span-1 bg-card border-l flex flex-col">
            <div className="p-6 flex-1">
                <Card className="h-full border-0 shadow-none">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <conditionDetails.icon className="w-8 h-8 text-primary" />
                            <CardTitle>{conditionDetails.title}</CardTitle>
                        </div>
                        <CardDescription>{conditionDetails.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="drivingCondition"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Driving Condition</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a driving condition" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="city">City</SelectItem>
                                    <SelectItem value="highway">Highway</SelectItem>
                                    <SelectItem value="off-road">Off-Road</SelectItem>
                                    </SelectContent>
                                </Select>
                                </FormItem>
                            )}
                            />
                             <FormField
                                control={form.control}
                                name="vehicleType"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Vehicle Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a vehicle type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="sedan">Sedan</SelectItem>
                                        <SelectItem value="truck">Truck</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </FormItem>
                                )}
                            />
                            <SubmitButton />
                        </form>
                    </Form>
                    </CardContent>
                    {state.result && (
                        <CardFooter className="flex-col items-start gap-4 pt-6">
                             <div className="space-y-4 w-full">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold flex items-center gap-2 mb-2"><Beaker className="w-5 h-5 text-primary"/> Impact on Vehicle Health</h3>
                                    <p className="text-sm text-muted-foreground">{state.result.impactOnVehicleHealth}</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold flex items-center gap-2 mb-2"><FileText className="w-5 h-5 text-primary"/> Predicted Maintenance Needs</h3>
                                    <p className="text-sm text-muted-foreground">{state.result.predictedMaintenanceNeeds}</p>
                                </div>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Simulating...
                </>
            ) : (
                "Run Simulation"
            )}
        </Button>
    )
}
