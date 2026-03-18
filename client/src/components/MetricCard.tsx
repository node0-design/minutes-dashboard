import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | null;
  trendPercent?: number;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function MetricCard({
  title,
  value,
  unit,
  trend,
  trendPercent,
  loading,
  icon,
  className = '',
  style,
}: MetricCardProps) {
  if (loading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-8 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 ${className}`}
      style={style}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="metric-label">{title}</p>
        </div>
        {icon && <div className="text-accent ml-2">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="metric-value">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>

      {trend && trendPercent !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend === 'up' ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{trendPercent}% vs yesterday</span>
        </div>
      )}
    </div>
  );
}
