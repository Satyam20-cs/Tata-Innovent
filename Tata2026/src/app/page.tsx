
'use client';

import AppHeader from '@/components/layout/app-header';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { VehicleStatus } from "@/components/dashboard/vehicle-status";
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { EnginePerformanceChart } from '@/components/dashboard/engine-performance-chart';
import { TirePressureChart } from '@/components/dashboard/tire-pressure-chart';
import { useActionState, useEffect, useRef, useState } from 'react';
import { predictMaintenanceAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, FileJson, Loader2, UploadCloud, Wrench, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialState = {
  predictedFailures: [],
  error: null,
};


export default function DashboardPage() {
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
            <AppHeader title="Dashboard" />
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                
                <Card>
                    <CardHeader>
                        <CardTitle>Real-Time Vehicle Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VehicleStatus />
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <Card className="flex flex-col flex-1">
                            <CardHeader>
                                <CardTitle>Engine Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <EnginePerformanceChart />
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col flex-1">
                            <CardHeader>
                                <CardTitle>Tire Pressure Status</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <TirePressureChart />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <Card className="flex flex-col flex-1">
                            <CardHeader>
                                <CardTitle>Recent Alerts</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <RecentAlerts />
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col flex-1">
                            <form onSubmit={handleFormSubmit} className="flex flex-col flex-1">
                                <CardHeader>
                                <CardTitle>Analyze Vehicle Data</CardTitle>
                                <CardDescription>
                                    Upload a JSON or CSV file to predict potential failures.
                                </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col">
                                    {!file ? (
                                        <div
                                            className="w-full flex-1 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <UploadCloud className="w-8 h-8 text-muted-foreground/50 mb-2" />
                                            <p className="font-semibold text-foreground text-sm">Click to upload or drag & drop</p>
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
                                        <div className="relative w-full flex-1 border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center text-center p-4 bg-primary/5">
                                            <FileJson className="w-8 h-8 text-primary mb-2" />
                                            <p className="font-semibold text-primary truncate w-full text-sm">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                                            <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-muted-foreground" onClick={clearFile}>
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
                    </div>
                </div>
                
                 {state.predictedFailures.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance Predictions</CardTitle>
                            <CardDescription>Based on the data you provided, here are the predicted maintenance needs.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {state.predictedFailures.map((failure, index) => (
                                <div key={index} className="p-4 rounded-lg border bg-card flex flex-col">
                                    <h3 className="font-semibold text-base flex items-center gap-2">
                                        <Wrench className="w-5 h-5 text-primary" /> {failure.component}
                                    </h3>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Failure Probability</p>
                                            <p className="font-bold text-lg">{(failure.failureProbability * 100).toFixed(0)}%</p>
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
                )}

                {state.error && (
                    <div>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Analysis Error</AlertTitle>
                            <AlertDescription>
                                {state.error}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
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
