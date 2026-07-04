export type Vehicle = {
    id: string;
    make: string;
    model: string;
    year: number;
    vin: string;
    status: 'Operational' | 'Needs Attention' | 'Out of Service';
    imageUrl: string;
    imageHint: string;
};

export type Alert = {
    id: string;
    vehicleId: string;
    message: string;
    severity: 'Low' | 'Medium' | 'High';
    timestamp: string;
};
