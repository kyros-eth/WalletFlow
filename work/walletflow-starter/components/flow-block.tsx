import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Zap, Shield, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FlowBlockProps {
  type: 'WHEN' | 'AND' | 'THEN';
  title: string;
  content: string;
  icon: LucideIcon;
  color?: string;
  isActive?: boolean;
}

export function FlowBlock({ type, title, content, icon: Icon, color = 'brand-primary', isActive = true }: FlowBlockProps) {
  const colorClasses = {
    'brand-primary': 'text-brand-primary border-brand-primary/30 bg-brand-primary/5',
    'brand-accent': 'text-brand-accent border-brand-accent/30 bg-brand-accent/5',
    'status-success': 'text-status-success border-status-success/30 bg-status-success/5',
  }[color as 'brand-primary' | 'brand-accent' | 'status-success'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-comfortable rounded-2xl border-2 glass-card transition-all ${isActive ? colorClasses : 'opacity-50'}`}
    >
      <div className="absolute -top-3 left-6 px-2 py-0.5 rounded-md bg-surface-raised border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-secondary">
        {type}
      </div>
      
      <div className="flex items-center gap-comfortable">
        <div className={`p-3 rounded-xl border ${colorClasses}`}>
          <Icon size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-caption text-text-muted font-bold uppercase tracking-wider">{title}</span>
          <span className="text-body font-bold text-white">{content}</span>
        </div>
      </div>

      {isActive && (
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-raised border border-white/20 flex items-center justify-center text-text-secondary shadow-lg">
           <ArrowRight size={14} />
        </div>
      )}
    </motion.div>
  );
}
