
'use client';

import AppHeader from '@/components/layout/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useActionState, useEffect, useRef, useState } from 'react';
import { predictMaintenanceAction } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileJson, Loader2, UploadCloud, Wrench, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const initialState = {
  predictedFailures: [],
  error: null,
};

export default function MaintenancePage() {
    const [state, formAction] = useActionState(predictMaintenanceAction, initialState);
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.error) {
        toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: state.error,
        });
        }
    }, [state, toast]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        setFile(selectedFile);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (readEvent) => {
            const content = readEvent.target?.result;
            if (typeof content === 'string') {
                const formData = new FormData();
                formData.append('vehicleData', content);
                formAction(formData);
            }
        };
        reader.readAsText(file);
    };

    const clearFile = () => {
        setFile(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }


  return (
    <div className="flex flex-col">
      <AppHeader title="Predictive Maintenance" />
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <Card className="lg:col-span-1">
            <form onSubmit={handleFormSubmit}>
                <CardHeader>
                <CardTitle>Analyze Vehicle Data</CardTitle>
                <CardDescription>
                    Upload a JSON or CSV file to predict potential failures.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div
                            className="w-full h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloud className="w-10 h-10 text-muted-foreground/50 mb-3" />
                            <p className="font-semibold text-foreground">Click to upload or drag & drop</p>
                            <p className="text-xs text-muted-foreground">JSON or CSV file</p>
                            <Input
                                ref={fileInputRef}
                                type="file"
                                name="fileUpload"
                                className="hidden"
                                accept=".json, .csv"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-48 border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center text-center p-6 bg-primary/5">
                            <FileJson className="w-10 h-10 text-primary mb-3" />
                            <p className="font-semibold text-primary truncate w-full">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-muted-foreground" onClick={clearFile}>
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <SubmitButton file={file} />
                </CardFooter>
            </form>
        </Card>

        <div className="lg:col-span-1 space-y-6">
            {state.predictedFailures.length > 0 ? (
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Predictions</CardTitle>
                    <CardDescription>Based on the data provided, here are the predicted maintenance needs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {state.predictedFailures.map((failure, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-card">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Wrench className="w-5 h-5 text-primary" /> {failure.component}
                            </h3>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Failure Probability</p>
                                    <Badge variant={failure.failureProbability > 0.7 ? "destructive" : "secondary"}>{(failure.failureProbability * 100).toFixed(0)}%</Badge>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Est. Time to Failure</p>
                                    <p className="font-medium">{failure.estimatedTimeToFailure}</p>
                                </div>
                            </div>
                            <Separator className="my-3"/>
                            <p className="text-muted-foreground text-sm">Suggested Action</p>
                            <p className="font-medium text-sm">{failure.suggestedAction}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        ) : (
            !state.error &&
            <Alert>
                <FileJson className="h-4 w-4" />
                <AlertTitle>Awaiting Analysis</AlertTitle>
                <AlertDescription>
                    Upload vehicle data to see predictive maintenance alerts.
                </AlertDescription>
            </Alert>
        )}

        {state.error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>
                    {state.error}
                </AlertDescription>
            </Alert>
        )}
        </div>
        
      </div>
    </div>
  );
}


function SubmitButton({ file } : { file: File | null }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={!file || pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                </>
            ) : (
                "Analyze Data"
            )}
        </Button>
    )
}
