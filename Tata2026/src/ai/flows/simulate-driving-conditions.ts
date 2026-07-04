'use server';

/**
 * @fileOverview Simulates driving conditions and assesses their impact on vehicle health.
 *
 * - simulateDrivingConditions - Simulates different driving conditions.
 * - SimulateDrivingConditionsInput - The input type for the simulateDrivingConditions function.
 * - SimulateDrivingConditionsOutput - The return type for the simulateDrivingConditions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateDrivingConditionsInputSchema = z.object({
  drivingCondition: z
    .enum(['highway', 'city', 'off-road'])
    .describe('The driving condition to simulate.'),
  vehicleType: z.string().describe('The type of vehicle being simulated.'),
  duration: z.number().describe('The duration of the simulation in minutes.'),
});
export type SimulateDrivingConditionsInput = z.infer<typeof SimulateDrivingConditionsInputSchema>;

const SimulateDrivingConditionsOutputSchema = z.object({
  predictedMaintenanceNeeds: z
    .string()
    .describe('The predicted maintenance needs based on the simulation.'),
  impactOnVehicleHealth: z
    .string()
    .describe('The impact on vehicle health based on the simulation.'),
});
export type SimulateDrivingConditionsOutput = z.infer<typeof SimulateDrivingConditionsOutputSchema>;

export async function simulateDrivingConditions(
  input: SimulateDrivingConditionsInput
): Promise<SimulateDrivingConditionsOutput> {
  return simulateDrivingConditionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateDrivingConditionsPrompt',
  input: {schema: SimulateDrivingConditionsInputSchema},
  output: {schema: SimulateDrivingConditionsOutputSchema},
  prompt: `You are an expert mechanic specializing in vehicle maintenance.

You will simulate the impact of different driving conditions on a vehicle and predict potential maintenance needs.

Driving Condition: {{{drivingCondition}}}
Vehicle Type: {{{vehicleType}}}
Duration: {{{duration}}} minutes

Based on these conditions, provide a detailed assessment of the potential impact on vehicle health and predicted maintenance needs.
`,
});

const simulateDrivingConditionsFlow = ai.defineFlow(
  {
    name: 'simulateDrivingConditionsFlow',
    inputSchema: SimulateDrivingConditionsInputSchema,
    outputSchema: SimulateDrivingConditionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
