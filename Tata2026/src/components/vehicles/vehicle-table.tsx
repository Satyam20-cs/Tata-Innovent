import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Vehicle } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type VehicleTableProps = {
  vehicles: Vehicle[];
  onDeleteVehicle: (id: string) => void;
};

const statusVariantMap: Record<Vehicle['status'], 'default' | 'destructive' | 'secondary'> = {
    'Operational': 'default',
    'Needs Attention': 'secondary',
    'Out of Service': 'destructive',
};

const statusColorMap: Record<Vehicle['status'], string> = {
    'Operational': 'bg-green-500',
    'Needs Attention': 'bg-yellow-500',
    'Out of Service': 'bg-red-500',
};

export function VehicleTable({ vehicles, onDeleteVehicle }: VehicleTableProps) {
  return (
    <div className="rounded-lg border">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Make & Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
                <TableCell>
                <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    width={64}
                    height={48}
                    className="rounded-md object-cover"
                    data-ai-hint={vehicle.imageHint}
                />
                </TableCell>
                <TableCell className="font-medium">{vehicle.make} {vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell className="font-code text-sm">{vehicle.vin}</TableCell>
                <TableCell>
                    <Badge variant={statusVariantMap[vehicle.status]} className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", statusColorMap[vehicle.status])}></span>
                        {vehicle.status}
                    </Badge>
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => onDeleteVehicle(vehicle.id)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
