import React, { useEffect } from 'react';
import { LayoutShell } from '@components/layout-shell';
import { AllocationMeter } from '@components/allocation-meter';
import { useFlowsStore } from '../stores/flows.store';
import { motion } from 'framer-motion';
import { Plus, SplitSquareHorizontal, Wallet, MoreHorizontal, Copy, Play, Pause, Trash2, CheckCircle2 } from 'lucide-react';

export default function FlowsPage() {
  const { flows, init, deleteFlow, updateFlow } = useFlowsStore();

  useEffect(() => {
    init();
  }, [init]);

  const handleDuplicate = (id: string) => {
    // Logic for duplication
  };

  const handleEdit = (id: string) => {
    window.App.transitionTo('flows-new');
  };

  return (
    <LayoutShell activeTab="flows">
      <div className="py-stack-sm flex flex-col gap-loose">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold text-white mb-1">Payment Splits</h1>
            <p className="text-body text-text-secondary">Every wallet allocation, ready to split a payment the moment it lands.</p>
          </div>
          <button onClick={() => window.App.transitionTo('flows-new')} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-text-on-primary px-comfortable py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-brand-primary/20">
            <Plus size={20} /> New Payment Split
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-comfortable">
          {flows.length > 0 ? flows.map((flow, i) => (
            <motion.div key={flow.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass-card p-comfortable rounded-3xl border-white/5 flex flex-col gap-comfortable group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${flow.status === 'Active' ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' : 'bg-status-warning/10 border-status-warning/20 text-status-warning'}`}>
                    <SplitSquareHorizontal size={20} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-h3 font-bold text-white">{flow.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-caption text-text-muted">Sender:</span>
                       <span className="text-caption text-text-secondary font-medium">{flow.sender}</span>
                       <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-surface-raised border border-white/10 text-text-muted font-mono">{flow.token}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-caption font-bold border ${flow.status === 'Active' ? 'bg-status-success/10 border-status-success/20 text-status-success' : 'bg-status-warning/10 border-status-warning/20 text-status-warning'}`}>
                  {flow.status}
                </div>
              </div>

              <div className="flex flex-col gap-snug">
                <span className="text-caption text-text-muted font-bold uppercase tracking-wider">Split Breakdown</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {flow.splits.map((split, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-surface-base border border-white/5 flex flex-col gap-1">
                      <span className="text-caption text-text-secondary truncate">{split.walletId === 'w1' ? 'Savings' : split.walletId === 'w2' ? 'Bills' : 'Main'}</span>
                      <div className="flex items-center justify-between">
                         <span className="text-body font-bold text-white">{split.percentage}%</span>
                         <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: split.walletId === 'w1' ? '#836EF9' : split.walletId === 'w2' ? '#85E6FF' : '#F9F9F9' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <AllocationMeter total={flow.splits.reduce((sum, s) => sum + s.percentage, 0)} compact />
              </div>

              <div className="flex items-center justify-between pt-comfortable border-t border-white/5">
                <div className="flex items-center gap-2">
                  <button onClick={() => updateFlow(flow.id, { status: flow.status === 'Active' ? 'Paused' : 'Active' })} className="p-2 rounded-lg bg-surface-raised border border-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all">
                    {flow.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button onClick={() => handleDuplicate(flow.id)} className="p-2 rounded-lg bg-surface-raised border border-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all">
                    <Copy size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={() => deleteFlow(flow.id)} className="p-2 rounded-lg bg-surface-raised border border-white/10 hover:border-status-error/40 text-text-secondary hover:text-status-error transition-all">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => handleEdit(flow.id)} className="px-4 py-2 rounded-lg bg-surface-raised border border-white/10 hover:border-white/20 text-caption font-bold text-white transition-all">
                    Edit Split
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <button onClick={() => window.App.transitionTo('flows-new')} className="lg:col-span-2 glass-card p-loose rounded-3xl border-dashed border-white/10 flex flex-col items-center justify-center gap-comfortable hover:border-white/20 group transition-all">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
                <Plus size={32} className="text-text-muted group-hover:text-brand-primary" />
              </div>
              <div className="text-center">
                <span className="text-h3 font-bold text-white mb-1 block">No Payment Splits Yet</span>
                <p className="text-caption text-text-muted">Set up wallet allocations once, then split every incoming payment automatically.</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}
