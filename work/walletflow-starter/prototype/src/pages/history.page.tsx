import React, { useEffect } from 'react';
import { LayoutShell } from '@components/layout-shell';
import { useHistoryStore } from '../stores/history.store';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Search, Filter, Download, ArrowUpRight, CheckCircle2, ExternalLink } from 'lucide-react';

export default function HistoryPage() {
  const { history, searchQuery, init, setSearchQuery } = useHistoryStore();

  useEffect(() => {
    init();
  }, [init]);

  const handleAction = () => {
    // Action handler for buttons
  };

  const filteredHistory = history.filter(item => 
    item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.flow.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LayoutShell activeTab="history">
      <div className="py-stack-sm flex flex-col gap-loose">
        <div className="flex items-center justify-between">
          <div><h1 className="text-h1 font-bold text-white mb-1">Payment History</h1><p className="text-body text-text-secondary">Audit trail of automated executions.</p></div>
          <div className="flex items-center gap-2">
            <button onClick={handleAction} className="p-3 rounded-xl bg-surface-raised border border-white/5 text-text-secondary hover:text-white transition-all"><Download size={20} /></button>
            <button onClick={handleAction} className="flex items-center gap-2 bg-surface-raised border border-white/10 px-comfortable py-3 rounded-xl text-caption font-bold text-white hover:border-white/20 transition-all"><Filter size={18} /> Filter</button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by sender, token, or hash..." className="w-full bg-surface-raised border border-white/5 rounded-2xl pl-12 pr-comfortable py-4 text-body text-white focus:outline-none focus:border-brand-primary transition-all" />
        </div>

        <div className="flex flex-col gap-4">
          {filteredHistory.length > 0 ? filteredHistory.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-comfortable rounded-3xl border-white/5 hover:border-white/10 transition-all">
              <div className="flex flex-col gap-loose">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-comfortable">
                    <div className="w-14 h-14 rounded-2xl bg-surface-raised border border-white/10 flex flex-col items-center justify-center text-text-muted"><span className="text-[10px] font-black uppercase">JUL</span><span className="text-h3 font-bold text-white">15</span></div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-body font-bold text-white">{item.sender}</span>
                        <span className="text-caption text-text-muted">sent</span>
                        <span className="text-body font-mono text-brand-highlight font-bold">{item.amount} {item.token}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-status-success" /><span className="text-caption text-status-success font-bold uppercase tracking-wider">Completed</span></div>
                        <span className="text-caption text-text-muted">Split: <span className="text-white font-medium">{item.flow}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-comfortable">
                    <div className="flex flex-col items-end">
                      <span className="text-caption text-text-muted font-mono">{item.hash}</span>
                      <button onClick={handleAction} className="text-caption text-brand-primary hover:text-brand-primary/80 font-bold flex items-center gap-1 mt-1">Explorer <ExternalLink size={12} /></button>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="text-right"><span className="text-caption text-text-muted block">Timestamp</span><span className="text-caption text-white font-medium">{item.timestamp}</span></div>
                  </div>
                </div>
                <div className="bg-surface-base/40 rounded-2xl p-comfortable border border-white/5">
                  <div className="flex items-center gap-2 mb-4"><HistoryIcon size={16} className="text-brand-accent" /><span className="text-caption text-text-secondary font-bold uppercase tracking-widest">Breakdown</span></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-comfortable">
                    {item.distributions.map((dist, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-surface-raised border border-white/5 relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary opacity-40" />
                        <div className="flex flex-col"><span className="text-caption text-text-muted">{dist.to}</span><span className="text-body font-bold text-white">{dist.amount} {item.token}</span></div>
                        <button onClick={handleAction}><ArrowUpRight size={16} className="text-text-muted group-hover:text-white transition-colors" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="p-section text-center glass-card rounded-3xl border-dashed border-white/10 text-text-muted">No history found. Payments will appear here.</div>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}
