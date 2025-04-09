
import { cn } from "@/lib/utils";

type StatusType = 'reported' | 'in-progress' | 'resolved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  'reported': {
    label: 'Reported',
    className: 'bg-orange-100 text-orange-800',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-800',
  },
  'resolved': {
    label: 'Resolved',
    className: 'bg-green-100 text-green-800',
  },
  'rejected': {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800',
  },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
