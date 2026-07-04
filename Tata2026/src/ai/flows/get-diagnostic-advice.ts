'use server';

/**
 * @fileOverview Provides diagnostic advice for vehicle issues based on user queries.
 *
 * - getDiagnosticAdvice - A function that takes a user's question about vehicle diagnostics and returns personalized advice.
 * - GetDiagnosticAdviceInput - The input type for the getDiagnosticAdvice function.
 * - GetDiagnosticAdviceOutput - The return type for the getDiagnosticAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDiagnosticAdviceInputSchema = z.object({
  query: z.string().describe('The user query about vehicle diagnostics or troubleshooting.'),
});
export type GetDiagnosticAdviceInput = z.infer<typeof GetDiagnosticAdviceInputSchema>;

const GetDiagnosticAdviceOutputSchema = z.object({
  advice: z.string().describe('Personalized diagnostic advice based on the user query.'),
});
export type GetDiagnosticAdviceOutput = z.infer<typeof GetDiagnosticAdviceOutputSchema>;

export async function getDiagnosticAdvice(input: GetDiagnosticAdviceInput): Promise<GetDiagnosticAdviceOutput> {
  return getDiagnosticAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getDiagnosticAdvicePrompt',
  input: {schema: GetDiagnosticAdviceInputSchema},
  output: {schema: GetDiagnosticAdviceOutputSchema},
  prompt: `You are an AI assistant specialized in providing vehicle diagnostic and troubleshooting advice. A user will ask a question and your task is to provide personalized advice to the user.

User Query: {{{query}}}

Advice:`,
});

const getDiagnosticAdviceFlow = ai.defineFlow(
  {
    name: 'getDiagnosticAdviceFlow',
    inputSchema: GetDiagnosticAdviceInputSchema,
    outputSchema: GetDiagnosticAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
