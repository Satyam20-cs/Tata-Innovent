'use server';
/**
 * @fileOverview Predicts potential component failures and suggests proactive maintenance.
 *
 * - predictComponentFailure - Analyzes vehicle data to predict failures.
 * - PredictiveMaintenanceInput - Input type for predictComponentFailure.
 * - PredictiveMaintenanceOutput - Return type for predictComponentFailure.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  vehicleData: z.string().describe('Historical and real-time vehicle diagnostic data in JSON format.'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  predictedFailures: z.array(
    z.object({
      component: z.string().describe('The component predicted to fail.'),
      failureProbability: z.number().describe('The probability of failure (0-1).'),
      estimatedTimeToFailure: z
        .string()
        .describe('Estimated time until failure (e.g., "2 weeks", "1 month").'),
      suggestedAction: z.string().describe('Suggested maintenance action to prevent failure.'),
    })
  ).describe('A list of predicted component failures and suggested actions.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function predictComponentFailure(
  input: PredictiveMaintenanceInput
): Promise<PredictiveMaintenanceOutput> {
  return predictiveMaintenanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveMaintenancePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  prompt: `You are an AI expert in vehicle diagnostics and predictive maintenance.
Analyze the following vehicle data to predict potential component failures and suggest proactive maintenance.

Vehicle Data: {{{vehicleData}}}

Provide a list of predicted failures, their probability, estimated time to failure, and suggested actions.
Format the output as a JSON array of objects, each containing the component, failureProbability, estimatedTimeToFailure, and suggestedAction.
`,
});

const predictiveMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictiveMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    try {
      // Attempt to parse the vehicle data as JSON; if it fails, return an error.
      JSON.parse(input.vehicleData);
    } catch (e: any) {
      throw new Error(
        `Vehicle data must be in valid JSON format.  The JSON parser reported: ${e.message}`
      );
    }

    const {output} = await prompt(input);
    return output!;
  }
);
