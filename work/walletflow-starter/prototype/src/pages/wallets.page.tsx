import React, { useEffect } from 'react';
import { LayoutShell } from '@components/layout-shell';
import { useWalletsStore } from '../stores/wallets.store';
import { motion } from 'framer-motion';
import { Wallet, Plus, MoreVertical, ExternalLink, ArrowUpRight, Shield, TrendingUp } from 'lucide-react';

export default function WalletsPage() {
  const { wallets, init } = useWalletsStore();

  useEffect(() => {
    init();
  }, [init]);

  const handleWalletAction = () => {
    // Action handler
  };

  return (
    <LayoutShell activeTab="wallets">
      <div className="py-stack-sm flex flex-col gap-loose">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold text-white mb-1">Destination Wallets</h1>
            <p className="text-body text-text-secondary">Manage your receiving addresses and allocation strategy.</p>
          </div>
          <button onClick={() => {}} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-text-on-primary px-comfortable py-3 rounded-xl font-bold transition-all active:scale-95">
            <Plus size={20} /> Add Wallet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-comfortable">
          {wallets.length > 0 ? wallets.map((wallet, i) => (
            <motion.div key={wallet.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-comfortable rounded-3xl border-white/5 group hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-loose">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-raised border border-white/10 flex items-center justify-center" style={{ color: wallet.color }}><Wallet size={24} /></div>
                  <div className="flex flex-col"><span className="text-body font-bold text-white">{wallet.name}</span><span className="text-caption text-text-muted">{wallet.type}</span></div>
                </div>
                <button onClick={handleWalletAction} className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all"><MoreVertical size={18} /></button>
              </div>
              <div className="bg-surface-base/50 rounded-2xl p-4 border border-white/5 mb-comfortable">
                <div className="flex items-center justify-between mb-2"><span className="text-caption text-text-muted">Network: Monad</span><button onClick={handleWalletAction} className="text-brand-accent"><ExternalLink size={14} /></button></div>
                <div className="flex items-center justify-between"><span className="text-caption font-mono text-white tracking-wider">{wallet.address}</span><button onClick={handleWalletAction} className="text-text-muted hover:text-white transition-all"><ArrowUpRight size={14} /></button></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between"><span className="text-caption text-text-secondary font-medium">Auto-Allocation</span><span className="text-body font-bold text-white">{wallet.allocation}%</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${wallet.allocation}%` }} className="h-full rounded-full" style={{ backgroundColor: wallet.color }} />
                </div>
              </div>
              <div className="mt-loose pt-comfortable border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5"><Shield size={14} className="text-status-success" /><span className="text-caption text-status-success font-bold">Whitelisted</span></div>
                <button onClick={handleWalletAction} className="text-caption font-bold text-text-secondary hover:text-white transition-all">Edit Wallet</button>
              </div>
            </motion.div>
          )) : (
            <div className="lg:col-span-3 glass-card p-section text-center text-text-muted rounded-3xl border-dashed border-white/10">No wallets connected. Add one to start automating.</div>
          )}
          <div className="glass-card p-comfortable rounded-3xl border-brand-primary/20 bg-brand-primary/5 flex flex-col justify-between overflow-hidden relative min-h-[250px]">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><TrendingUp size={100} className="text-brand-primary" /></div>
            <div><h3 className="text-h3 font-bold text-white mb-2">Strategy</h3><p className="text-caption text-text-secondary leading-relaxed">Distribution model: <span className="text-brand-primary font-bold">Linear Precision</span>.</p></div>
            <button onClick={() => {}} className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-caption font-bold text-white border border-white/10 transition-all mt-4">Rebalance Flows</button>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
