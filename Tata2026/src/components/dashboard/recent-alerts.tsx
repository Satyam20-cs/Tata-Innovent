import { alerts } from '@/lib/data';
import { vehicles } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

const severityMap = {
    High: { icon: ShieldAlert, color: 'text-destructive' },
    Medium: { icon: AlertTriangle, color: 'text-yellow-500' },
    Low: { icon: Info, color: 'text-blue-500' },
};

export function RecentAlerts() {
  const recentAlerts = alerts.slice(0, 4);

  return (
    <div className="space-y-4">
      {recentAlerts.map((alert) => {
        const vehicle = vehicles.find(v => v.id === alert.vehicleId);
        const SeverityIcon = severityMap[alert.severity].icon;
        return (
          <div key={alert.id} className="flex items-start gap-3">
            <SeverityIcon className={cn('h-5 w-5 mt-0.5', severityMap[alert.severity].color)} />
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs text-muted-foreground">
                {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle'} &middot;{' '}
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
