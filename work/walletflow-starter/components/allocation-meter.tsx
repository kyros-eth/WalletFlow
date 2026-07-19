import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';

interface AllocationMeterProps {
  total: number;
  compact?: boolean;
}

export function AllocationMeter({ total, compact = false }: AllocationMeterProps) {
  const isComplete = total === 100;
  const isOver = total > 100;
  const barWidth = Math.min(total, 100);

  const tone = isComplete
    ? { text: 'text-status-success', bar: 'bg-status-success', ring: 'border-status-success/30 bg-status-success/5' }
    : isOver
    ? { text: 'text-status-error', bar: 'bg-status-error', ring: 'border-status-error/30 bg-status-error/5' }
    : { text: 'text-brand-accent', bar: 'bg-brand-accent', ring: 'border-brand-accent/30 bg-brand-accent/5' };

  return (
    <div className={`flex flex-col gap-2 rounded-2xl border ${tone.ring} ${compact ? 'p-3' : 'p-comfortable'} transition-colors duration-300`}>
      <div className="flex items-center justify-between">
        <span className="text-caption font-bold uppercase tracking-wider text-text-muted">Allocation</span>
        <div className={`flex items-center gap-1.5 font-mono font-bold ${compact ? 'text-body' : 'text-h3'} ${tone.text}`}>
          {total}%
          {isComplete && <Check size={compact ? 14 : 18} strokeWidth={3} />}
          {isOver && <AlertTriangle size={compact ? 14 : 18} strokeWidth={2.5} />}
        </div>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className={`h-full rounded-full ${tone.bar}`}
        />
        {isOver && (
          <div
            className="absolute top-0 h-full bg-status-error/40"
            style={{ left: '100%', width: `${Math.min(total - 100, 40)}%` }}
          />
        )}
      </div>
      {!compact && (
        <span className={`text-caption ${tone.text}`}>
          {isComplete ? 'Ready to execute — every unit accounted for.' : isOver ? `Over by ${total - 100}%. Trim a split to continue.` : `${100 - total}% unassigned.`}
        </span>
      )}
    </div>
  );
}
