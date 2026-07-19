import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'primary' | 'accent' | 'success';
}

export function StatCard({ label, value, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const colorMap = {
    primary: 'text-brand-primary bg-brand-primary/10 border-brand-primary/20',
    accent: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
    success: 'text-status-success bg-status-success/10 border-status-success/20',
  };

  return (
    <div className="glass-card p-comfortable rounded-card flex flex-col gap-tight hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className="text-caption text-status-success font-medium">
            {trend}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-caption text-text-muted uppercase tracking-wider">{label}</span>
        <span className="text-h2 text-text-primary font-bold">{value}</span>
      </div>
    </div>
  );
}
