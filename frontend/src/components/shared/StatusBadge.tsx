import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'collected' | 'cancelled' | 'sent' | 'failed';
  className?: string;
}

const statusStyles = {
  active: 'bg-success/15 text-success border-success/30',
  inactive: 'bg-muted text-muted-foreground border-muted-foreground/30',
  pending: 'bg-warning/15 text-warning border-warning/30',
  collected: 'bg-success/15 text-success border-success/30',
  cancelled: 'bg-destructive/15 text-destructive border-destructive/30',
  sent: 'bg-success/15 text-success border-success/30',
  failed: 'bg-destructive/15 text-destructive border-destructive/30',
};

const statusLabels = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  collected: 'Collected',
  cancelled: 'Cancelled',
  sent: 'Sent',
  failed: 'Failed',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium capitalize border',
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
}
