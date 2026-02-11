import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning';
  className?: string;
}

const variantStyles = {
  default: 'bg-card border border-border',
  primary: 'gradient-primary text-primary-foreground',
  accent: 'gradient-gold text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
};

const iconBgStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  accent: 'bg-accent-foreground/20 text-accent-foreground',
  success: 'bg-success-foreground/20 text-success-foreground',
  warning: 'bg-warning-foreground/20 text-warning-foreground',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  const isLight = variant === 'default';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-4 sm:p-6 shadow-card card-hover',
        variantStyles[variant],
        className
      )}
    >
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 opacity-10 text-4xl sm:text-6xl pointer-events-none select-none">
        ✦
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-responsive-sm font-medium truncate',
            isLight ? 'text-muted-foreground' : 'opacity-80'
          )}>
            {title}
          </p>
          <p className={cn(
            'text-responsive-2xl font-bold mt-1 truncate',
            isLight ? 'text-foreground' : ''
          )}>
            {value}
          </p>
          {(subtitle || trend) && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {trend && (
                <span className={cn(
                  'text-responsive-sm font-medium',
                  trend.isPositive 
                    ? isLight ? 'text-success' : 'text-success-foreground'
                    : isLight ? 'text-destructive' : 'text-destructive-foreground'
                )}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              )}
              {subtitle && (
                <span className={cn(
                  'text-responsive-sm',
                  isLight ? 'text-muted-foreground' : 'opacity-70'
                )}>
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div className={cn(
            'flex-shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl',
            iconBgStyles[variant]
          )}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
