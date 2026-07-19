import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutShell } from '@components/layout-shell';
import { StatCard } from '@components/stat-card';
import { useDashboardStore } from '../stores/dashboard.store';
import { Wallet, SplitSquareHorizontal, History, CheckCircle2, ArrowUpRight, TrendingUp, Clock, Terminal, Activity, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  const { stats, history, init } = useDashboardStore();

  useEffect(() => {
    init();
  }, [init]);

  const handleRowAction = (id: string) => {
    window.App.transitionTo('history');
  };

  return (
    <LayoutShell activeTab="dashboard">
      <div className="py-stack-sm flex flex-col gap-loose">
        {/* Hero Balance Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-section rounded-3xl relative overflow-hidden border-white/5"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <TrendingUp size={160} className="text-brand-primary" />
          </div>
          <div className="relative z-10">
            <span className="text-caption text-text-muted uppercase tracking-[0.2em] font-bold mb-2 block">Aggregate Balance</span>
            <div className="flex items-baseline gap-4">
               <h1 className="text-display font-bold text-white">${stats.totalRouted}</h1>
               <div className="flex items-center gap-1 text-status-success text-body font-medium bg-status-success/10 px-2 py-0.5 rounded-lg border border-status-success/20">
                 <ArrowUpRight size={16} />
                 12.5%
               </div>
            </div>
            <p className="text-caption text-text-secondary mt-4 flex items-center gap-2">
              <Clock size={14} /> Last calculated 2 minutes ago
            </p>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-comfortable">
          <StatCard label="Total Split" value={`$${stats.totalRouted}`} icon={ArrowUpRight} trend="+12%" />
          <StatCard label="Splits Executed" value={stats.paymentsAutomated} icon={SplitSquareHorizontal} color="accent" />
          <StatCard label="Success Rate" value={stats.executionRate} icon={CheckCircle2} color="success" />
          <StatCard label="Active Flows" value={stats.activeFlows} icon={Terminal} />
          <StatCard label="Wallets" value="5" icon={Wallet} color="accent" />
        </div>

        {/* Recent Activity Timeline */}
        <div className="flex flex-col gap-comfortable">
          <div className="flex items-center justify-between">
            <h2 className="text-h3 font-bold text-white flex items-center gap-3">
              <Activity className="text-brand-primary" size={24} />
              Recent Activity
            </h2>
            <button onClick={() => window.App.transitionTo('history')} className="text-caption text-brand-accent hover:text-brand-accent/80 font-bold flex items-center gap-1 transition-colors">
              View Full History <ChevronRight size={16} />
            </button>
          </div>

          <div className="glass-card rounded-3xl border-white/5 divide-y divide-white/5 overflow-hidden">
            {history.length > 0 ? history.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-comfortable hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => handleRowAction(item.id)}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-comfortable">
                    <div className="w-12 h-12 rounded-xl bg-surface-raised border border-white/10 flex items-center justify-center flex-shrink-0">
                      <SplitSquareHorizontal size={24} className="text-brand-primary" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-body font-bold text-white">{item.sender}</span>
                        <span className="text-caption text-text-muted">paid</span>
                        <span className="text-body font-mono text-brand-accent font-bold">{item.amount} {item.token}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-caption text-text-secondary">Split:</span>
                        <span className="text-caption px-2 py-0.5 rounded-md bg-brand-primary/10 text-brand-primary font-bold border border-brand-primary/20">{item.flow}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 lg:max-w-md">
                    <div className="grid grid-cols-3 gap-2">
                      {item.distributions.map((dist, idx) => (
                        <div key={idx} className="flex flex-col p-2 rounded-lg bg-surface-raised border border-white/5">
                          <span className="text-[10px] text-text-muted truncate">{dist.to}</span>
                          <span className="text-caption text-white font-bold">{dist.amount} <span className="text-[10px]">{item.token}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between lg:justify-end gap-comfortable w-full lg:w-auto">
                    <div className="flex flex-col items-end">
                      <span className="text-caption text-white font-bold flex items-center gap-1.5"><CheckCircle2 size={14} className="text-status-success" /> {item.status}</span>
                      <span className="text-caption text-text-muted">{item.timestamp}</span>
                    </div>
                    <button className="p-2 rounded-xl bg-surface-raised border border-white/10 hover:border-white/20 transition-all text-text-secondary hover:text-white">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="p-section text-center text-text-muted">No recent activity.</div>
            )}
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
