'use server';

import { getDiagnosticAdvice } from '@/ai/flows/get-diagnostic-advice';
import { predictComponentFailure } from '@/ai/flows/predictive-maintenance-alerts';
import { simulateDrivingConditions } from '@/ai/flows/simulate-driving-conditions';
import { z } from 'zod';

// Action for Predictive Maintenance
const predictMaintenanceSchema = z.object({
  vehicleData: z.string().min(1, 'Vehicle data cannot be empty.'),
});

type PredictMaintenanceState = {
  predictedFailures: {
    component: string;
    failureProbability: number;
    estimatedTimeToFailure: string;
    suggestedAction: string;
  }[];
  error: string | null;
};

export async function predictMaintenanceAction(
  prevState: PredictMaintenanceState,
  formData: FormData
): Promise<PredictMaintenanceState> {
  const validatedFields = predictMaintenanceSchema.safeParse({
    vehicleData: formData.get('vehicleData'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.flatten().fieldErrors.vehicleData?.[0] ?? 'Invalid input.',
    };
  }

  try {
     JSON.parse(validatedFields.data.vehicleData);
  } catch(e) {
    return {
        ...prevState,
        predictedFailures: [],
        error: "Invalid JSON format."
    }
  }

  try {
    const result = await predictComponentFailure(validatedFields.data);
    return {
      predictedFailures: result.predictedFailures,
      error: null,
    };
  } catch (e: any) {
    return {
      ...prevState,
      predictedFailures: [],
      error: e.message || 'An unexpected error occurred.',
    };
  }
}

// Action for Driving Simulator
const simulationSchema = z.object({
  drivingCondition: z.enum(['highway', 'city', 'off-road']),
  vehicleType: z.string().min(3, "Vehicle type must be at least 3 characters."),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
});


type SimulationState = {
    result: {
        predictedMaintenanceNeeds: string;
        impactOnVehicleHealth: string;
    } | null;
    error: string | null;
}

export async function runSimulationAction(prevState: SimulationState, formData: FormData) : Promise<SimulationState> {
    const validatedFields = simulationSchema.safeParse({
        drivingCondition: formData.get('drivingCondition'),
        vehicleType: formData.get('vehicleType'),
        duration: formData.get('duration'),
    });

    if(!validatedFields.success) {
        return {
            ...prevState,
            error: "Invalid form data provided.",
        }
    }
    
    try {
        const result = await simulateDrivingConditions(validatedFields.data);
        return {
            result: result,
            error: null
        }
    } catch (e: any) {
        return {
            ...prevState,
            result: null,
            error: e.message || "An unexpected error occurred during simulation."
        }
    }
}


// Action for AI Assistant
const diagnosticAdviceSchema = z.object({
    query: z.string().min(1, 'Query cannot be empty.'),
});

type DiagnosticAdviceState = {
    advice: string | null;
    error: string | null;
}

export async function getDiagnosticAdviceAction(prevState: DiagnosticAdviceState, formData: FormData): Promise<DiagnosticAdviceState> {
    const validatedFields = diagnosticAdviceSchema.safeParse({
        query: formData.get('query'),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            error: validatedFields.error.flatten().fieldErrors.query?.[0] ?? 'Invalid query.',
        };
    }

    try {
        const result = await getDiagnosticAdvice(validatedFields.data);
        return {
            advice: result.advice,
            error: null,
        };
    } catch (e: any) {
        return {
            ...prevState,
            advice: null,
            error: e.message || 'An unexpected error occurred.',
        };
    }
}
